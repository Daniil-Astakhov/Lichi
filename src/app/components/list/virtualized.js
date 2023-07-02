import { FixedSizeList as List } from "react-window";
const VirtualLisl = ({ width, height, itemCount, itemSize, itemData, row }) => {
  return (
    <List
      className="List"
      width={width}
      height={height}
      itemCount={itemCount}
      itemSize={itemSize}
      itemData={itemData}
    >
      {row}
    </List>
  );
};

export default VirtualLisl;
