import { ReactComponent as Safeway } from '../assets/safeway.svg';
import { ReactComponent as Aldi } from '../assets/aldi.svg';
import { ReactComponent as Walmart } from '../assets/walmart.svg';
import { ReactComponent as Other } from '../assets/other.svg';
import { ReactComponent as Goodwill } from '../assets/goodwill.svg';
import { ReactComponent as HomeDepot } from '../assets/homedepot.svg';
import { ReactComponent as HobbyLobby } from '../assets/hobbylobby.svg';
import { ReactComponent as HomeGoods } from '../assets/homegoods.svg';
import { ReactComponent as Latelas } from '../assets/latelas.svg';
import { ReactComponent as UPS } from '../assets/ups.svg';
import { ReactComponent as Amazon } from '../assets/amazon.svg';
import React from 'react';
import { forEach as FOREACH, orderBy as ORDERBY } from 'lodash';

const HW = 35;

const icon = (ICON) => {
  return <ICON height={HW} width={HW} />;
};

export const STORES = {
  Other: icon(Other),
  Aldi: icon(Aldi),
  Amazon: icon(Amazon),
  Goodwill: icon(Goodwill),
  'Hobby Lobby': icon(HobbyLobby),
  'Home Depot': icon(HomeDepot),
  HomeGoods: icon(HomeGoods),
  "Latela's": icon(Latelas),
  Safeway: icon(Safeway),
  UPS: icon(UPS),
  Walmart: icon(Walmart),
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

export const SpinnerOverlay = <div className='loader-box'> </div>;
