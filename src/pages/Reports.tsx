
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Filter, Download, Search } from 'lucide-react';

const Reports = () => {
  const [filters, setFilters] = useState({
    dataInicial: '',
    dataFinal: '',
    separador: '',
    situacao: ''
  });

  // Dados simulados para os relatórios
  const reportData = [
    {
      id: '001',
      data: '2024-06-20',
      separador: 'João Silva',
      cliente: 'Cliente A',
      pedido: 'PED-001',
      itens: 15,
      tempoSeparacao: '18min',
      situacao: 'Completo',
      observacoes: ''
    },
    {
      id: '002',
      data: '2024-06-20',
      separador: 'Maria Santos',
      cliente: 'Cliente B',
      pedido: 'PED-002',
      itens: 8,
      tempoSeparacao: '12min',
      situacao: 'Parcial',
      observacoes: '3 itens em falta'
    },
    {
      id: '003',
      data: '2024-06-21',
      separador: 'Pedro Costa',
      cliente: 'Cliente C',
      pedido: 'PED-003',
      itens: 22,
      tempoSeparacao: '25min',
      situacao: 'Completo',
      observacoes: ''
    },
    {
      id: '004',
      data: '2024-06-21',
      separador: 'Ana Lima',
      cliente: 'Cliente D',
      pedido: 'PED-004',
      itens: 12,
      tempoSeparacao: '16min',
      situacao: 'Parcial',
      observacoes: '1 item danificado'
    },
    {
      id: '005',
      data: '2024-06-22',
      separador: 'Carlos Oliveira',
      cliente: 'Cliente E',
      pedido: 'PED-005',
      itens: 6,
      tempoSeparacao: '9min',
      situacao: 'Completo',
      observacoes: ''
    }
  ];

  const separadores = ['João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Lima', 'Carlos Oliveira'];

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const filteredData = reportData.filter(item => {
    const matchDataInicial = !filters.dataInicial || item.data >= filters.dataInicial;
    const matchDataFinal = !filters.dataFinal || item.data <= filters.dataFinal;
    const matchSeparador = !filters.separador || filters.separador === 'todos' || item.separador === filters.separador;
    const matchSituacao = !filters.situacao || filters.situacao === 'todas' || item.situacao === filters.situacao;
    
    return matchDataInicial && matchDataFinal && matchSeparador && matchSituacao;
  });

  const totalPedidos = filteredData.length;
  const pedidosCompletos = filteredData.filter(item => item.situacao === 'Completo').length;
  const pedidosParciais = filteredData.filter(item => item.situacao === 'Parcial').length;
  const tempoMedio = filteredData.length > 0 
    ? Math.round(filteredData.reduce((acc, item) => acc + parseInt(item.tempoSeparacao), 0) / filteredData.length)
    : 0;

  const exportToCSV = () => {
    const headers = ['ID', 'Data', 'Separador', 'Cliente', 'Pedido', 'Itens', 'Tempo', 'Situação', 'Observações'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => [
        row.id,
        row.data,
        row.separador,
        row.cliente,
        row.pedido,
        row.itens,
        row.tempoSeparacao,
        row.situacao,
        row.observacoes
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio-separacao.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
            <p className="text-gray-600">Análise detalhada de separação de pedidos</p>
          </div>
          <Button onClick={exportToCSV} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar CSV
          </Button>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataInicial">Data Inicial</Label>
                <Input
                  id="dataInicial"
                  type="date"
                  value={filters.dataInicial}
                  onChange={(e) => handleFilterChange('dataInicial', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dataFinal">Data Final</Label>
                <Input
                  id="dataFinal"
                  type="date"
                  value={filters.dataFinal}
                  onChange={(e) => handleFilterChange('dataFinal', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Separador</Label>
                <Select value={filters.separador} onValueChange={(value) => handleFilterChange('separador', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os separadores" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os separadores</SelectItem>
                    {separadores.map(separador => (
                      <SelectItem key={separador} value={separador}>{separador}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Situação do Pedido</Label>
                <Select value={filters.situacao} onValueChange={(value) => handleFilterChange('situacao', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as situações" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas as situações</SelectItem>
                    <SelectItem value="Completo">Completo</SelectItem>
                    <SelectItem value="Parcial">Parcial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo dos Resultados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Pedidos</p>
                  <p className="text-3xl font-bold text-blue-600">{totalPedidos}</p>
                </div>
                <Search className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pedidos Completos</p>
                  <p className="text-3xl font-bold text-green-600">{pedidosCompletos}</p>
                  <p className="text-xs text-gray-600">
                    {totalPedidos > 0 ? `${Math.round((pedidosCompletos / totalPedidos) * 100)}%` : '0%'} do total
                  </p>
                </div>
                <Calendar className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pedidos Parciais</p>
                  <p className="text-3xl font-bold text-orange-600">{pedidosParciais}</p>
                  <p className="text-xs text-gray-600">
                    {totalPedidos > 0 ? `${Math.round((pedidosParciais / totalPedidos) * 100)}%` : '0%'} do total
                  </p>
                </div>
                <Filter className="w-12 h-12 text-orange-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tempo Médio</p>
                  <p className="text-3xl font-bold text-purple-600">{tempoMedio}min</p>
                  <p className="text-xs text-gray-600">por pedido</p>
                </div>
                <Calendar className="w-12 h-12 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Dados */}
        <Card>
          <CardHeader>
            <CardTitle>Detalhamento dos Pedidos</CardTitle>
            <p className="text-sm text-gray-600">
              Exibindo {filteredData.length} de {reportData.length} registros
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Separador</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Pedido</TableHead>
                    <TableHead>Itens</TableHead>
                    <TableHead>Tempo</TableHead>
                    <TableHead>Situação</TableHead>
                    <TableHead>Observações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{new Date(item.data).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{item.separador}</TableCell>
                      <TableCell>{item.cliente}</TableCell>
                      <TableCell>{item.pedido}</TableCell>
                      <TableCell>{item.itens}</TableCell>
                      <TableCell>{item.tempoSeparacao}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.situacao === 'Completo' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {item.situacao}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {item.observacoes || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhum registro encontrado com os filtros aplicados.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
