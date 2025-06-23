
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  ArrowLeft, 
  User, 
  Save,
  UserPlus
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    profile: "",
    active: true
  });

  // Dados mockados para os perfis disponíveis
  const profiles = [
    { id: "admin", name: "Administrador" },
    { id: "operator", name: "Operador" },
    { id: "supervisor", name: "Supervisor" },
    { id: "viewer", name: "Visualizador" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do usuário:", formData);
    // Aqui seria implementada a lógica de cadastro
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Cadastro de Usuário</h1>
              <p className="text-sm text-gray-500">Criar novo usuário do sistema</p>
            </div>
          </div>
          
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Form Card */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Informações do Usuário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Nome
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite o nome completo"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="h-12 bg-white border-gray-200"
                  required
                />
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite a senha"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="h-12 bg-white border-gray-200"
                  required
                />
              </div>

              {/* Perfil */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Perfil
                </Label>
                <Select 
                  value={formData.profile} 
                  onValueChange={(value) => handleInputChange("profile", value)}
                >
                  <SelectTrigger className="h-12 bg-white border-gray-200">
                    <SelectValue placeholder="Selecione um perfil" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg">
                    {profiles.map((profile) => (
                      <SelectItem key={profile.id} value={profile.id}>
                        {profile.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Ativo */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Status
                </Label>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Usuário Ativo</p>
                    <p className="text-xs text-gray-500">
                      {formData.active ? "O usuário poderá acessar o sistema" : "O usuário não poderá acessar o sistema"}
                    </p>
                  </div>
                  <Switch
                    checked={formData.active}
                    onCheckedChange={(checked) => handleInputChange("active", checked)}
                  />
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="flex-1 h-12 border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Usuário
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card className="border-0 shadow-sm mt-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Preview dos Dados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Nome:</span>
                <span className="text-sm text-gray-900">{formData.name || "Não informado"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600">Perfil:</span>
                <span className="text-sm text-gray-900">
                  {profiles.find(p => p.id === formData.profile)?.name || "Não selecionado"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm font-medium text-gray-600">Status:</span>
                <span className={`text-sm font-medium ${formData.active ? 'text-green-600' : 'text-red-600'}`}>
                  {formData.active ? "Ativo" : "Inativo"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserRegistration;
