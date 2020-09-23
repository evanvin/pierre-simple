import { ReactComponent as Safeway } from '../assets/safeway.svg';
import { ReactComponent as Aldi } from '../assets/aldi.svg';
import { ReactComponent as Walmart } from '../assets/walmart.svg';
import { ReactComponent as Other } from '../assets/other.svg';
import React from 'react';

export const getStoreIcon = (store) => {
  const HW = 40;
  switch (store) {
    case 'Aldi':
      return <Aldi height={HW} width={HW} />;
    case 'Safeway':
      return <Safeway height={HW} width={HW} />;
    case 'Walmart':
      return <Walmart height={HW} width={HW} />;
    default:
      return <Other height={HW} width={HW} />;
  }
};
