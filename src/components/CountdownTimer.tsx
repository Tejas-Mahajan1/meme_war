
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Rocket } from 'lucide-react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set launch date to 30 days from now
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Rocket className="w-6 h-6 text-purple-400 animate-bounce-slow" />
        <h3 className="text-2xl font-bold text-gradient-gold">Token Launch Countdown</h3>
        <Rocket className="w-6 h-6 text-purple-400 animate-bounce-slow" />
      </div>
      
      <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds }
        ].map((item, index) => (
          <Card key={index} className="bg-card-gradient border-purple-800/30 hover-glow">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-gradient-purple animate-pulse-slow">
                {item.value.toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
