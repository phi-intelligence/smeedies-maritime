import OfficeCard from '../OfficeCard';

export default function OfficeCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <OfficeCard
        name="Accra Office"
        location="Kotoka International Airport"
        services="Air cargo handling"
        digitalAddress="GL-125-6946"
      />
    </div>
  );
}
