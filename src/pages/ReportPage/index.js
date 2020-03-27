import React, { useContext } from 'react';
import TopBar from 'components/TopBar';
import Card from '../../components/Card';
import './style.scss';
import { userContext } from 'utils/context';

export default function ReportPage() {
  const { tasks } = useContext(userContext);

  const dates = tasks.filter((item, index, array) => {
    return (
      array.map((mapItem) => mapItem['date']).indexOf(item['date']) === index
    );
  });

  const cards = dates.map((task, index) => {
    if (task.task.time !== '' && task.task.action !== '') {
      return <Card key={index} task={task} />;
    } else return null;
  });

  const newCards = cards.filter((c) => c !== null);

  console.log('new', newCards);

  const contentWelcome = () => {
    return (
      <div className={'report-main-content-welcome'}>
        <h1>At first create a tasks</h1>
      </div>
    );
  };

  const content = () => {
    if (newCards.length > 0) {
      return <div className="report-main-content">{cards}</div>;
    } else return <>{contentWelcome()}</>;
  };

  return (
    <div className="report-page">
      <TopBar text={'Report page'} />
      {content()}
    </div>
  );
}
