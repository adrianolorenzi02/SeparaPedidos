
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Save, X } from "lucide-react";

interface UserFormProps {
  onCancel: () => void;
  onSubmit: (userData: any) => void;
}

const UserForm = ({ onCancel, onSubmit }: UserFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    profile: "",
    active: true
  });

  const profiles = [
    { id: "admin", name: "Administrador" },
    { id: "operator", name: "Operador" },
    { id: "supervisor", name: "Supervisor" },
    { id: "viewer", name: "Visualizador" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Novo Usuário
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 h-12 border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              <X className="w-4 h-4 mr-2" />
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
  );
};

export default UserForm;
