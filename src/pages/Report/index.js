import React, { useContext } from 'react';
import TopBar from 'components/TopBar';
import Card from '../../components/Card';
import './style.scss';
import { userContext } from 'utils/context';

export default function ReportPage() {
  const { tasks } = useContext(userContext);

  const sortedDates = tasks.map((t) => {
    return t.date;
  });
  sortedDates.sort();

  const dates = sortedDates?.filter((item, index, array) => {
    return array.map((mapItem) => mapItem).indexOf(item) === index;
  });

  const cards = dates?.map((date, index) => {
    return <Card key={index} date={date} />;
  });

  const newCards = cards?.filter((c) => c !== null);

  const content = () => {
    if (newCards?.length > 0) {
      return (
        <div className="report-page">
          <TopBar text={'Report page'} />
          <div className="report-main-content">{cards}</div>
        </div>
      );
    } else
      return (
        <div className="report-page-welcome">
          <TopBar text={'Report page'} />
          <div className={'report-main-content-welcome'}>
            <h1>At first create a tasks</h1>
          </div>
        </div>
      );
  };

  return <>{content()}</>;
}
