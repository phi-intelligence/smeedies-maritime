import StatCounter from '../StatCounter';

export default function StatCounterExample() {
  return (
    <div className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
          <StatCounter end={40} suffix="+" label="Countries Network Coverage" />
          <StatCounter end={24} suffix="/7" label="Round-the-Clock Availability" />
          <StatCounter end={3} label="Major Ports Served" />
          <StatCounter end={100} suffix="%" label="On-Time Delivery Success" />
        </div>
      </div>
    </div>
  );
}
