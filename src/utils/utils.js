import { ReactComponent as Safeway } from '../assets/safeway.svg';
import { ReactComponent as Aldi } from '../assets/aldi.svg';
import { ReactComponent as Walmart } from '../assets/walmart.svg';
import { ReactComponent as Other } from '../assets/other.svg';
import React from 'react';
import { forEach as FOREACH, orderBy as ORDERBY } from 'lodash';

export const getStoreIcon = (store) => {
  const HW = 35;
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

export const formatList = (items) => {
  const list = [];
  const m = new Map();

  FOREACH(items, (i) => {
    // Add new store if not present
    const store = i.store || 'Other';
    if (!m.has(store)) {
      m.set(store, { name: store, aisles: new Map() });
    }

    // Aisle
    const aisle = i.aisle || 'Other';
    if (!m.get(store).aisles.has(aisle)) {
      m.get(store).aisles.set(aisle, { name: aisle, items: [] });
    }

    // Add item to aisle
    m.get(store).aisles.get(aisle).items.push({ name: i.name, qty: i.qty });
  });

  // Flatten maps
  m.forEach((store) => {
    let aisles = [];
    store.aisles.forEach((aisle) => {
      aisles.push(aisle);
    });
    aisles = ORDERBY(aisles, ['name'], ['desc']);
    store.aisles = aisles;

    list.push(store);
  });

  return list;
};
