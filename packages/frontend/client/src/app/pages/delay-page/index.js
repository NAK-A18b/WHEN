import React from 'react';

import SubwayIllustration from '../../components/illustrations/subway';
import Title from '../../components/title';
import Label from '../../components/label';
import ConnectionIndicator from '../../components/connection-indicator';

import Delay from './test.json'

import './styles.css';

const parseTime = time => {
  time = time.toString();
  return `${time.substring(0, 2)}:${time.substring(2, 4)}`;
}

const DelayPage = (props) => {
  const { delays = Delay } = props;

  return (
    <div>
      <div className={ 'title-wrapper' }>
        <Title>Verspätungen</Title>
        <Label className={ 'delays-count-label' }>{ delays.length } gemeldet</Label>
      </div>
      <div className={ 'body-wrapper' }>
        {
          delays.length > 0 ? (
            delays.map( (delay, i) => {
              const isLongDelay = delay.delay > 10;
              return (
                <div className={ 'delay-wrapper' } key={i}>
                  <div className={ `connection-marker${ isLongDelay ? '--red' : '' }` }></div>
                  <div className={ 'delay-body-wrapper' }>
                    <div className={ 'delay-station-info-wrapper' }>
                      <ConnectionIndicator /> 
                      <div className={ 'delay-station-info' }>
                        <Label primary>{ delay.start.name }</Label>
                        <Label primary>{ delay.end.name }</Label>
                      </div>
                    </div>
                    <Label fontWeight={ '1000' }  big>{ delay.train }</Label>
                    <div className={ 'delay-time-info' }>
                      <Label color={ isLongDelay ? '#F04040' : '#fcba03' } big>{ delay.delay } min.</Label>
                      <Label primary>
                        { parseTime(delay.start.time + delay.delay) } - { parseTime(delay.end.time + delay.delay) }
                      </Label>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <SubwayIllustration />
          )
        }
      </div>
    </div>
  );
}

export default DelayPage;