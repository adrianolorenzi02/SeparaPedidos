
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Clock, User, Package, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = () => {
  // Dados simulados para os gráficos
  const dailyData = [
    { day: 'Seg', pedidos: 45, tempo: 12 },
    { day: 'Ter', pedidos: 52, tempo: 15 },
    { day: 'Qua', pedidos: 38, tempo: 10 },
    { day: 'Qui', pedidos: 67, tempo: 18 },
    { day: 'Sex', pedidos: 71, tempo: 20 },
    { day: 'Sáb', pedidos: 28, tempo: 8 },
    { day: 'Dom', pedidos: 15, tempo: 5 }
  ];

  const weeklyData = [
    { semana: 'Sem 1', pedidos: 280, eficiencia: 85 },
    { semana: 'Sem 2', pedidos: 320, eficiencia: 88 },
    { semana: 'Sem 3', pedidos: 295, eficiencia: 82 },
    { semana: 'Sem 4', pedidos: 340, eficiencia: 91 }
  ];

  const separatorData = [
    { name: 'João', pedidos: 89, tempo: 245 },
    { name: 'Maria', pedidos: 76, tempo: 198 },
    { name: 'Pedro', pedidos: 92, tempo: 267 },
    { name: 'Ana', pedidos: 68, tempo: 189 },
    { name: 'Carlos', pedidos: 84, tempo: 223 }
  ];

  const timeDistribution = [
    { faixa: '0-5min', quantidade: 45, color: '#22c55e' },
    { faixa: '5-10min', quantidade: 67, color: '#3b82f6' },
    { faixa: '10-15min', quantidade: 38, color: '#f59e0b' },
    { faixa: '15+min', quantidade: 23, color: '#ef4444' }
  ];

  const chartConfig = {
    pedidos: {
      label: "Pedidos",
      color: "#3b82f6",
    },
    tempo: {
      label: "Tempo (min)",
      color: "#f59e0b",
    },
    eficiencia: {
      label: "Eficiência (%)",
      color: "#22c55e",
    }
  };

  const totalPedidos = dailyData.reduce((acc, day) => acc + day.pedidos, 0);
  const tempoMedio = Math.round(dailyData.reduce((acc, day) => acc + day.tempo, 0) / dailyData.length);
  const melhorSeparador = separatorData.reduce((prev, current) => 
    (prev.pedidos > current.pedidos) ? prev : current
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Análise de performance de separação</p>
          </div>
          <div className="text-sm text-gray-500">
            Atualizado em: {new Date().toLocaleDateString('pt-BR')}
          </div>
        </div>

        {/* Cards de Totalizadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pedidos</p>
                  <p className="text-3xl font-bold text-blue-600">{totalPedidos}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12% vs semana passada
                  </p>
                </div>
                <Package className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tempo Médio</p>
                  <p className="text-3xl font-bold text-orange-600">{tempoMedio}min</p>
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" />
                    -5% vs semana passada
                  </p>
                </div>
                <Clock className="w-12 h-12 text-orange-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Melhor Separador</p>
                  <p className="text-2xl font-bold text-green-600">{melhorSeparador.name}</p>
                  <p className="text-xs text-gray-600">{melhorSeparador.pedidos} pedidos</p>
                </div>
                <User className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Eficiência Média</p>
                  <p className="text-3xl font-bold text-purple-600">87%</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +3% vs semana passada
                  </p>
                </div>
                <Calendar className="w-12 h-12 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Pedidos por Dia */}
          <Card>
            <CardHeader>
              <CardTitle>Pedidos por Dia da Semana</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="pedidos" fill="var(--color-pedidos)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Gráfico de Tempo Médio */}
          <Card>
            <CardHeader>
              <CardTitle>Tempo Médio de Separação</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="tempo" stroke="var(--color-tempo)" strokeWidth={3} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Gráfico Semanal */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Semanal</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semana" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar yAxisId="left" dataKey="pedidos" fill="var(--color-pedidos)" />
                  <Bar yAxisId="right" dataKey="eficiencia" fill="var(--color-eficiencia)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Distribuição de Tempo */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Tempo de Separação</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <PieChart>
                  <Pie
                    data={timeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="quantidade"
                  >
                    {timeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Ranking de Separadores */}
        <Card>
          <CardHeader>
            <CardTitle>Ranking de Separadores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {separatorData
                .sort((a, b) => b.pedidos - a.pedidos)
                .map((separator, index) => (
                  <div key={separator.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
                        ${index === 0 ? 'bg-gold bg-yellow-500' : 
                          index === 1 ? 'bg-silver bg-gray-400' : 
                          index === 2 ? 'bg-bronze bg-orange-600' : 'bg-gray-500'}`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{separator.name}</p>
                        <p className="text-sm text-gray-600">{separator.pedidos} pedidos separados</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{Math.round(separator.tempo / separator.pedidos)}min</p>
                      <p className="text-sm text-gray-600">tempo médio</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
