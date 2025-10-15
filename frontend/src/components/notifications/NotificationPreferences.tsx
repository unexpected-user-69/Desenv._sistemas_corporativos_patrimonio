// Componente de preferências de notificações

import React, { useEffect, useState } from 'react';
import { Settings, Save, Bell, Mail, Smartphone, Monitor } from 'lucide-react';
import { useNotificationsStore } from '../../stores/notificationsStore';
import type {
  NotificationPreferences as NotificationPreferencesType,
  NotificationType,
  NotificationChannel,
} from '../../types/notifications';

export const NotificationPreferences: React.FC = () => {
  const { preferences, isLoading, fetchPreferences, updatePreferences } =
    useNotificationsStore();
  const [formData, setFormData] = useState<
    Partial<NotificationPreferencesType>
  >({});

  useEffect(() => {
    void fetchPreferences();
  }, [fetchPreferences]);

  useEffect(() => {
    if (preferences) {
      setFormData(preferences);
    }
  }, [preferences]);

  const handleSave = async () => {
    try {
      await updatePreferences(formData);
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-500">Carregando preferências...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Preferências de Notificação
        </h3>

        <div className="space-y-6">
          {/* Canais Globais */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h4 className="text-md font-medium text-gray-900 mb-4">
              Canais de Notificação
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Email</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.channels?.email || false}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      channels: {
                        inApp: formData.channels?.inApp || false,
                        email: e.target.checked,
                        sms: formData.channels?.sms || false,
                        push: formData.channels?.push || false,
                      },
                    })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">SMS</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.channels?.sms || false}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      channels: {
                        inApp: formData.channels?.inApp || false,
                        email: formData.channels?.email || false,
                        sms: e.target.checked,
                        push: formData.channels?.push || false,
                      },
                    })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Push</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.channels?.push || false}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      channels: {
                        inApp: formData.channels?.inApp || false,
                        email: formData.channels?.email || false,
                        sms: formData.channels?.sms || false,
                        push: e.target.checked,
                      },
                    })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Monitor className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">No aplicativo</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.channels?.inApp || false}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      channels: {
                        inApp: e.target.checked,
                        email: formData.channels?.email || false,
                        sms: formData.channels?.sms || false,
                        push: formData.channels?.push || false,
                      },
                    })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          {/* Horário Silencioso */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h4 className="text-md font-medium text-gray-900 mb-4">
              Horário Silencioso
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  Ativar horário silencioso
                </span>
                <input
                  type="checkbox"
                  checked={formData.quietHours?.enabled || false}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quietHours: {
                        ...formData.quietHours,
                        enabled: e.target.checked,
                        start: formData.quietHours?.start || '22:00',
                        end: formData.quietHours?.end || '08:00',
                        timezone:
                          formData.quietHours?.timezone || 'America/Sao_Paulo',
                      },
                    })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              {formData.quietHours?.enabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Início
                    </label>
                    <input
                      type="time"
                      value={formData.quietHours?.start || '22:00'}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          quietHours: {
                            ...formData.quietHours,
                            start: e.target.value,
                            enabled: formData.quietHours?.enabled || false,
                            end: formData.quietHours?.end || '08:00',
                            timezone:
                              formData.quietHours?.timezone ||
                              'America/Sao_Paulo',
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fim
                    </label>
                    <input
                      type="time"
                      value={formData.quietHours?.end || '08:00'}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          quietHours: {
                            ...formData.quietHours,
                            end: e.target.value,
                            enabled: formData.quietHours?.enabled || false,
                            start: formData.quietHours?.start || '22:00',
                            timezone:
                              formData.quietHours?.timezone ||
                              'America/Sao_Paulo',
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botão Salvar */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Salvar Preferências</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
