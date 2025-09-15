import React from 'react';
import { SkeletonGrid } from '../global';

const ProductGridSkeleton = ({ count = 2 }) => {
  return (
    <SkeletonGrid
      columns={2}
      rows={Math.ceil(count / 2)}
      cardHeight="225px"
      gap="12px"
    />
  );
};

export default ProductGridSkeleton;
