
import { Card, CardContent } from "@/components/ui/card";

interface Stat {
  label: string;
  value: string;
  color: string;
  bgColor: string;
}

interface StatsGridProps {
  stats: Stat[];
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mb-3`}>
              <span className={`text-lg font-bold ${stat.color}`}>
                {stat.value}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-900 mb-1">{stat.label}</p>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className={`h-1 rounded-full ${stat.color.replace('text-', 'bg-')}`}
                style={{ width: `${Math.min(parseInt(stat.value) * 2, 100)}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
