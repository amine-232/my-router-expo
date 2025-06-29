import { View, Text, FlatList } from "react-native";
import React from "react";
export const ListITems = ({
  data,
  numColumns,
  Component,
  horizontal,
}: {
  horizontal?: boolean;
  data: any[];
  numColumns?: number;
  Component: (item: any) => any;
}) => {
  if (!horizontal) {
    return (
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        numColumns={numColumns}
        extraData={({ item, index }: { item: any; index: number }) => item}
        renderItem={({ item }) => {
          return <Component item={item} />;
        }}
      />
    );
  }

  if (horizontal) {
    return (
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal={horizontal}
        extraData={({ item, index }: { item: any; index: number }) => item}
        renderItem={({ item }) => {
          return <Component item={item} />;
        }}
      />
    );
  }
};
export default ListITems;
