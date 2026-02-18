'use client';

import { useEffect, useState } from 'react';

export function useRecentlyViewed(currentId: string) {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    // 1. Get existing history from local storage
    const stored = localStorage.getItem('recentlyViewed');
    let ids: string[] = stored ? JSON.parse(stored) : [];

    // 2. Add current ID to the front, remove duplicates, and limit to 4
    ids = [currentId, ...ids.filter((id) => id !== currentId)].slice(0, 5);

    // 3. Save back to local storage
    localStorage.setItem('recentlyViewed', JSON.stringify(ids));
    setRecentIds(ids.filter(id => id !== currentId)); // Don't show current product in "recent" list
  }, [currentId]);

  return recentIds;
}
