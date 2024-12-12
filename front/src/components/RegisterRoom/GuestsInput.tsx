import { useState, useEffect } from 'react';

interface GuestsInputProps {
  maxGuests?: number;
  onGuestsChange: (guests: number) => void;
  initialGuests?: number; // Se puede recibir un valor inicial
}

const GuestsInput: React.FC<GuestsInputProps> = ({ maxGuests = 8, onGuestsChange, initialGuests = 0 }) => {
  const [guests, setGuests] = useState<number>(initialGuests);

  // Actualiza el valor de guests si cambia desde el componente padre (RegisterForm)
  useEffect(() => {
    setGuests(initialGuests);
  }, [initialGuests]);

  const incrementGuests = () => {
    if (guests < maxGuests) {
      const newGuests = guests + 1;
      setGuests(newGuests);
      onGuestsChange(newGuests);
    }
  };

  const decrementGuests = () => {
    if (guests > 0) {
      const newGuests = guests - 1;
      setGuests(newGuests);
      onGuestsChange(newGuests);
    }
  };
  console.log('====================================');
  console.log(incrementGuests);
  console.log('====================================');

  console.log('====================================');
  console.log(decrementGuests);
  console.log('====================================');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0 && value <= maxGuests) {
      setGuests(value);
      onGuestsChange(value);
    }
  };

  return (
    <div className="flex place-items-start gap-2">
      <input
        type="number"
        value={guests}
        onChange={handleInputChange}
        className="border border-gray-400 rounded p-2 flex-grow"
        max={maxGuests}
        min={0}
        placeholder={`Máx ${maxGuests}`}
      />
    </div>
  );
};

export default GuestsInput;


  
  
