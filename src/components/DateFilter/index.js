import React from 'react';
import dateFormat from 'dateformat';

export default function DateFilter({ date, className }) {
  const filteredDate = dateFormat(date, 'd mmmm yyyy');

  return (
    <>
      <h3 className={className}>{filteredDate}</h3>
    </>
  );
}
