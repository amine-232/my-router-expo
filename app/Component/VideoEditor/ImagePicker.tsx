import * as ImagePicker from "expo-image-picker";

const pickImage =  ({ setImage }: { setImage: (e: any) => void }) => {
  // No permissions request is necessary for launching the image library
  const Picke = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images", "videos"],
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.canceled) {
    setImage({ uri: result.assets[0].uri });
  }
  }
return Picke()
};

export default pickImage 
