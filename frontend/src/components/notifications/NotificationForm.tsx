// Componente de formulário para criação e edição de notificações

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNotificationsStore } from '../../stores/notificationsStore';
import {
  Notification,
  NotificationType,
  NotificationPriority,
  // NotificationStatus,
  NotificationCategory,
  NotificationChannel,
} from '../../types/notifications';
// UI components - usando elementos HTML básicos por enquanto
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';
import { Label } from '../ui/Label';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/Form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { Switch } from '../ui/Switch';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover';
import { Calendar } from '../ui/Calendar';
import {
  CalendarIcon,
  // Clock,
  // User,
  // Mail,
  Bell,
  Settings,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Schema de validação
const NotificationFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(200, 'Título deve ter no máximo 200 caracteres'),
  message: z
    .string()
    .min(1, 'Mensagem é obrigatória')
    .max(1000, 'Mensagem deve ter no máximo 1000 caracteres'),
  type: z.nativeEnum(NotificationType),
  priority: z.nativeEnum(NotificationPriority),
  category: z.nativeEnum(NotificationCategory),
  channels: z
    .array(z.nativeEnum(NotificationChannel))
    .min(1, 'Pelo menos um canal deve ser selecionado'),
  recipientId: z.string().min(1, 'ID do destinatário é obrigatório'),
  recipientEmail: z
    .string()
    .email('Email inválido')
    .optional()
    .or(z.literal('')),
  senderId: z.string().optional(),
  senderName: z.string().optional(),
  isScheduled: z.boolean().default(false),
  scheduledAt: z.date().optional(),
  expiresAt: z.date().optional(),
  metadata: z
    .object({
      actionUrl: z.string().url('URL inválida').optional().or(z.literal('')),
      actionText: z.string().optional(),
      icon: z.string().optional(),
      image: z.string().url('URL inválida').optional().or(z.literal('')),
      tags: z.array(z.string()).optional(),
      data: z.record(z.string(), z.any()).optional(),
    })
    .optional(),
});

type NotificationFormData = z.infer<typeof NotificationFormSchema>;

interface NotificationFormProps {
  notification?: Notification;
  onSubmit: (data: NotificationFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

export const NotificationForm: React.FC<NotificationFormProps> = ({
  notification,
  onSubmit,
  onCancel,
  isLoading = false,
  mode = 'create',
}) => {
  const { fetchTemplates } = useNotificationsStore();

  const form = useForm<NotificationFormData>({
    // resolver: zodResolver(NotificationFormSchema),
    defaultValues: {
      title: notification?.title || '',
      message: notification?.message || '',
      type: notification?.type || NotificationType.INFO,
      priority: notification?.priority || NotificationPriority.MEDIUM,
      category: notification?.category || NotificationCategory.CUSTOM,
      channels: notification?.channels || [NotificationChannel.IN_APP],
      recipientId: notification?.userId || '',
      recipientEmail: '',
      senderId: '',
      senderName: '',
      isScheduled: false,
      scheduledAt: undefined,
      expiresAt: notification?.expiresAt
        ? new Date(notification.expiresAt)
        : undefined,
      metadata: {
        actionUrl: notification?.actions?.[0]?.url || '',
        actionText: notification?.actions?.[0]?.label || '',
        icon: '',
        image: '',
        tags: [],
        data: notification?.data || {},
      },
    },
  });

  // Carregar templates na inicialização
  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  // Função para obter ícone do tipo de notificação
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.INFO:
        return <Bell className="h-4 w-4 text-blue-500" />;
      case NotificationType.SUCCESS:
        return <Bell className="h-4 w-4 text-green-500" />;
      case NotificationType.WARNING:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case NotificationType.ERROR:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case NotificationType.SYSTEM:
        return <Settings className="h-4 w-4 text-gray-500" />;
      case NotificationType.USER:
        return <Bell className="h-4 w-4 text-purple-500" />;
      case NotificationType.REPORT:
        return <Bell className="h-4 w-4 text-indigo-500" />;
      case NotificationType.PATRIMONIO:
        return <Bell className="h-4 w-4 text-orange-500" />;
      case NotificationType.SECURITY:
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  // Função para lidar com envio do formulário
  const handleSubmit = async (data: NotificationFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  // Função para lidar com cancelamento
  const handleCancel = () => {
    form.reset();
    onCancel();
  };

  // Função para adicionar tag
  const addTag = (tag: string) => {
    const currentTags = form.getValues('metadata.tags') || [];
    if (tag && !currentTags.includes(tag)) {
      form.setValue('metadata.tags', [...currentTags, tag]);
    }
  };

  // Função para remover tag
  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues('metadata.tags') || [];
    form.setValue(
      'metadata.tags',
      currentTags.filter((tag) => tag !== tagToRemove),
    );
  };

  // Renderizar campo de tags
  const renderTagsField = () => {
    const tags = form.watch('metadata.tags') || [];
    const [newTag, setNewTag] = React.useState('');

    return (
      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            placeholder="Adicionar tag..."
            value={newTag}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewTag(e.target.value)
            }
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag(newTag);
                setNewTag('');
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              addTag(newTag);
              setNewTag('');
            }}
          >
            Adicionar
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {mode === 'create' ? 'Criar Nova Notificação' : 'Editar Notificação'}
        </h2>
        <p className="text-gray-600 mt-1">
          {mode === 'create'
            ? 'Preencha os campos abaixo para criar uma nova notificação'
            : 'Modifique os campos abaixo para editar a notificação'}
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(form.getValues());
          }}
          className="space-y-6"
        >
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
              <TabsTrigger value="content">Conteúdo</TabsTrigger>
              <TabsTrigger value="delivery">Entrega</TabsTrigger>
              <TabsTrigger value="advanced">Avançado</TabsTrigger>
            </TabsList>

            {/* Aba de Informações Básicas */}
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(NotificationType).map((type) => (
                            <SelectItem key={type} value={type}>
                              <div className="flex items-center space-x-2">
                                {getNotificationIcon(type)}
                                <span>
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Prioridade</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a prioridade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(NotificationPriority).map(
                            (priority) => (
                              <SelectItem key={priority} value={priority}>
                                {priority.charAt(0).toUpperCase() +
                                  priority.slice(1)}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(NotificationCategory).map(
                            (category) => (
                              <SelectItem key={category} value={category}>
                                {category.charAt(0).toUpperCase() +
                                  category.slice(1)}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recipientId"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>ID do Destinatário</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ID do usuário destinatário"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        ID único do usuário que receberá a notificação
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="recipientEmail"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Email do Destinatário (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="email@exemplo.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Email do destinatário para notificações por email
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            {/* Aba de Conteúdo */}
            <TabsContent value="content" className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título da notificação" {...field} />
                    </FormControl>
                    <FormDescription>
                      Título principal da notificação
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Mensagem</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Mensagem da notificação"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Conteúdo principal da notificação
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="metadata.actionUrl"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>URL de Ação (Opcional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://exemplo.com/acao"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        URL para redirecionamento quando a notificação for
                        clicada
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metadata.actionText"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Texto da Ação (Opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ver detalhes" {...field} />
                      </FormControl>
                      <FormDescription>Texto do botão de ação</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {renderTagsField()}
            </TabsContent>

            {/* Aba de Entrega */}
            <TabsContent value="delivery" className="space-y-4">
              <FormField
                control={form.control}
                name="channels"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Canais de Entrega</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.values(NotificationChannel).map((channel) => (
                        <div
                          key={channel}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={channel}
                            checked={field.value?.includes(channel) || false}
                            onChange={(e) => {
                              const currentChannels = field.value || [];
                              if (e.target.checked) {
                                field.onChange([...currentChannels, channel]);
                              } else {
                                field.onChange(
                                  currentChannels.filter(
                                    (c: NotificationChannel) => c !== channel,
                                  ),
                                );
                              }
                            }}
                            className="rounded"
                          />
                          <Label htmlFor={channel} className="text-sm">
                            {channel.charAt(0).toUpperCase() + channel.slice(1)}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <FormDescription>
                      Selecione os canais pelos quais a notificação será enviada
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="senderId"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>ID do Remetente (Opcional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ID do usuário remetente"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        ID do usuário que está enviando a notificação
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="senderName"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Nome do Remetente (Opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do remetente" {...field} />
                      </FormControl>
                      <FormDescription>
                        Nome do usuário que está enviando a notificação
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            {/* Aba Avançado */}
            <TabsContent value="advanced" className="space-y-4">
              <FormField
                control={form.control}
                name="isScheduled"
                render={({ field }: { field: any }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Agendar Notificação
                      </FormLabel>
                      <FormDescription>
                        Marque para agendar o envio da notificação para uma data
                        específica
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch('isScheduled') && (
                <FormField
                  control={form.control}
                  name="scheduledAt"
                  render={({ field }: { field: any }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data e Hora do Envio</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP 'às' HH:mm", {
                                  locale: ptBR,
                                })
                              ) : (
                                <span>Selecione a data e hora</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date: any) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }: { field: any }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de Expiração (Opcional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP', { locale: ptBR })
                            ) : (
                              <span>Selecione a data de expiração</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Data após a qual a notificação será automaticamente
                      removida
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>

          {/* Botões de ação */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? 'Salvando...'
                : mode === 'create'
                  ? 'Criar Notificação'
                  : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
