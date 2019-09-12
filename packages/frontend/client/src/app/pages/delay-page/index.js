import React from 'react';
import gql from 'graphql-tag';

import SubwayIllustration from '../../components/illustrations/subway';
import Heading from '../../components/heading';
import Label from '../../components/label';
import ConnectionIndicator from '../../components/connection-indicator';

import Delay from './test.json';

import './styles.css';
import { useQuery } from '@apollo/react-hooks';

export const DELAY_QUERY = gql`
  query DelayQuery {
    delays {
      id
      depDelay
      arrDelay
      start {
        name
        time
      }
      end {
        name
        time
      }
    }
  }
`;

const parseTime = (time, delay) => {
  time = time.toString();
  return `${time.substring(0, 2)}:${time.substring(2, 4)}`;
};

const DelayPage = props => {
  const {
    loading,
    data: { delays }
  } = useQuery(DELAY_QUERY);

  return (
    <div>
      <Heading
        title={'Verspätungen'}
        subtitle={`${!loading && delays.length} gemeldet`}
      />
      <div className={'body-wrapper'}>
        {!loading && delays.length > 0 ? (
          <div className={'scroll-wrapper'}>
            {delays.map((delay, i) => {
              const isLongDelay = delay.delay > 10;
              return (
                <div className={'delay-wrapper'} key={i}>
                  <div
                    className={`connection-marker${isLongDelay ? '--red' : ''}`}
                  ></div>
                  <div className={'delay-body-wrapper'}>
                    <div className={'delay-station-info-wrapper'}>
                      <ConnectionIndicator />
                      <div className={'delay-station-info'}>
                        <Label primary>{delay.start.name}</Label>
                        <Label primary>{delay.end.name}</Label>
                      </div>
                    </div>
                    <Label fontWeight={'bold'} big>
                      {delay.train}
                    </Label>
                    <div className={'delay-time-info'}>
                      <Label color={isLongDelay ? '#F04040' : '#fcba03'} big>
                        {delay.depDelay} min.
                      </Label>
                      <Label primary>
                        {parseTime(delay.start.time, delay.depDelay)} -{' '}
                        {parseTime(delay.end.time, delay.depDelay)}
                      </Label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <SubwayIllustration />
        )}
      </div>
    </div>
  );
};

export default DelayPage;
