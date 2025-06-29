import React from 'react';
import { View, FlatList, TouchableOpacity, Image,Text } from 'react-native';


const FilterSelector = ({ filters, selectedFilter, onSelectFilter, onApplyFilter }:{filters: any[]; selectedFilter: any, onSelectFilter: any, onApplyFilter: any,}) => {
  return (
    <View>
      <FlatList
        horizontal
        data={filters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => onSelectFilter(item.id)}
            style={{ opacity: selectedFilter === item.id ? 1 : 0.6 }}
          >
            <Image source={item.preview} style={{ width: 80, height: 80 }} />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={onApplyFilter}>
        <Text>Apply Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterSelector;