import React from 'react';
import '../Style/LeftSection.css';
import Card from './Card';

function LeftSection() {
  return (
    <div className="section">
      <div className='blue line'></div>
      <div className='green line'></div>
      <div className='yellow line'></div>
      <Card title={'Load Testing'} className={'card1'} description={`Our platform ensures peak performance by simulating real-world user loads efficiently and accurately.`} icon={<div className="icon load"></div>}/>
      <Card title={'AI Recommendations'} className={'card2'} description={`Optimize load and security testing with intelligent, data-driven insights for enhanced performance and safety.`} icon={<div className="icon security"></div>}  />
      <Card title={'Security Testing'} className={'card3'} description={`Safeguard your applications by identifying vulnerabilities and ensuring robust protection against threats.`} icon={<div className="icon ai"></div>}/>
    </div>
  );
}

export default LeftSection;
