import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { FFmpegKit, StatisticsCallback, Statistics, MediaInformationSession, FFprobeKit } from 'ffmpeg-kit-react-native';

interface ExportButtonProps {
  videoUri: string;
  duration?: number; // Make it optional if you'll fetch it internally
}

const ExportButton: React.FC<ExportButtonProps> = ({ videoUri, duration: propDuration }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exportQuality, setExportQuality] = useState(0.8);
  const [showQualityModal, setShowQualityModal] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [duration, setDuration] = useState(propDuration || 0);

  // Fetch duration if not provided
 useEffect(() => {
    const fetchDuration = async () => {
      if (!propDuration) {
        const videoDuration = await getVideoDuration(videoUri);
        setDuration(videoDuration);
      }
    };
    fetchDuration();
  }, [videoUri, propDuration]);


  const getVideoDuration = async (videoUri: string): Promise<number> => {
  try {
    const filePath = videoUri.startsWith('file://') ? videoUri.substring(7) : videoUri;
    const session = await FFprobeKit.getMediaInformationAsync(filePath);
    const information = await session.getMediaInformation();
    
    if (information) {
      return information.getDuration() * 1000; // Convert to milliseconds
    }
    return 0;
  } catch (error) {
    console.error('Error getting video duration:', error);
    return 0;
  }
};


  const handleExport = async () => {
    if (duration <= 0) {
      alert('Cannot determine video duration');
      return;
    }

    setIsExporting(true);
    setProgress(0);
    setExportComplete(false);

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access media library is required!');
        return;
      }

      const inputPath = videoUri.startsWith('file://') 
        ? videoUri.substring(7) 
        : videoUri;

      const timestamp = new Date().getTime();
      const outputPath = `${FileSystem.cacheDirectory}export_${timestamp}.mp4`;

      const crfValue = Math.round(51 * (1 - exportQuality));
      const command = `-i ${inputPath} -c:v libx264 -crf ${crfValue} -preset fast -c:a aac ${outputPath}`;

      const statisticsCallback: StatisticsCallback = (statistics: Statistics) => {
        const currentProgress = Math.min(1, Math.max(0, statistics.getTime() / duration));
        setProgress(currentProgress);
      };

      const session = await FFmpegKit.executeWithArgumentsAsync(
        command.split(' '),
        undefined,
        undefined,
        statisticsCallback
      );

      const returnCode = await session.getReturnCode();
      
      if (returnCode.isValueSuccess()) {
        await MediaLibrary.saveToLibraryAsync(outputPath);
        setExportComplete(true);
      } else {
        throw new Error(`Export failed with code ${returnCode.getValue()}`);
      }
    } catch (error) {
      console.error('Export error:', error);
      alert(`Export failed: ${error}`);
    } finally {
      setIsExporting(false);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.exportButton}
        onPress={() => setShowQualityModal(true)}
        disabled={isExporting}
      >
        {isExporting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.exportText}>Export Video</Text>
        )}
      </TouchableOpacity>

      {isExporting && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Exporting: {Math.round(progress * 100)}%
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${progress * 100}%` }]}
            />
          </View>
        </View>
      )}

      {exportComplete && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>Video exported successfully!</Text>
        </View>
      )}

      <Modal
        visible={showQualityModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowQualityModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Export Quality</Text>

            <Slider
              style={styles.slider}
              minimumValue={0.1}
              maximumValue={1}
              value={exportQuality}
              onValueChange={setExportQuality}
              minimumTrackTintColor="#1EB1FC"
              maximumTrackTintColor="#D3D3D3"
              thumbTintColor="#1EB1FC"
            />

            <View style={styles.qualityLabels}>
              <Text style={styles.qualityLabel}>Smaller File</Text>
              <Text style={styles.qualityLabel}>Better Quality</Text>
            </View>

            <Text style={styles.qualityValue}>
              Quality: {Math.round(exportQuality * 100)}%
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowQualityModal(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.exportModalButton]}
                onPress={() => {
                  setShowQualityModal(false);
                  handleExport();
                }}
              >
                <Text style={styles.buttonText}>Export</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 30,
  },
  exportButton: {
    backgroundColor: "#1EB1FC",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  exportText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  progressContainer: {
    marginTop: 15,
    width: "100%",
  },
  progressText: {
    textAlign: "center",
    marginBottom: 5,
    color: "#666",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#1EB1FC",
  },
  successContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  successText: {
    color: "white",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  qualityLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  qualityLabel: {
    fontSize: 12,
    color: "#666",
  },
  qualityValue: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
    marginRight: 10,
  },
  exportModalButton: {
    backgroundColor: "#1EB1FC",
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ExportButton;
