import type * as HttpClient from "@effect/platform/HttpClient";
import * as HttpClientError from "@effect/platform/HttpClientError";
import * as HttpClientRequest from "@effect/platform/HttpClientRequest";
import * as HttpClientResponse from "@effect/platform/HttpClientResponse";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import type { ParseError } from "effect/ParseResult";
import * as S from "effect/Schema";

/**
 * Логический тип
 */
export class Boolean extends S.Literal("1", "0", "true", "false") {}

/**
 * Типы каналов
 */
export class ChannelType extends S.Literal(
  "telegram",
  "fbmessenger",
  "viber",
  "whatsapp",
  "skype",
  "vk",
  "instagram",
  "consultant",
  "yandex_chat",
  "odnoklassniki",
  "max",
  "ozon",
  "wildberries",
  "yandex_market",
  "mega_market",
  "avito",
  "drom",
  "youla",
  "custom",
) {}

export class ListChannelsParams extends S.Struct({
  id: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  active: S.optionalWith(Boolean, { nullable: true }),
  types: S.optionalWith(S.Array(ChannelType), { nullable: true }),
  since: S.optionalWith(S.String, { nullable: true }),
  until: S.optionalWith(S.String, { nullable: true }),
  limit: S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1), S.lessThanOrEqualTo(1000)), {
    nullable: true,
  }),
}) {}

/**
 * Поддержка операций с сообщениями данного типа
 */
export class ChannelFeature extends S.Literal("none", "receive", "send", "both") {}

/**
 * Поддержка текстовых сообщений
 */
export class TextMessageSetting extends S.Class<TextMessageSetting>(
  "@integratop/retailcrm-transport-api-effect/TextMessageSetting",
)({
  creating: S.optionalWith(ChannelFeature, { nullable: true }),
  deleting: S.optionalWith(ChannelFeature, { nullable: true }),
  editing: S.optionalWith(ChannelFeature, { nullable: true }),
  quoting: S.optionalWith(ChannelFeature, { nullable: true }),
  reaction: S.optionalWith(ChannelFeature, { nullable: true }),
  /**
   * Максимальное количество символов в текстовом сообщении
   */
  max_chars_count: S.optionalWith(S.Int, { nullable: true }),
}) {}

/**
 * Поддержка аудио сообщений
 */
export class AudioMessageSetting extends S.Class<AudioMessageSetting>(
  "@integratop/retailcrm-transport-api-effect/AudioMessageSetting",
)({
  creating: S.optionalWith(ChannelFeature, { nullable: true }),
  deleting: S.optionalWith(ChannelFeature, { nullable: true }),
  quoting: S.optionalWith(ChannelFeature, { nullable: true }),
  reaction: S.optionalWith(ChannelFeature, { nullable: true }),
  /**
   * Максимальный размер аудиофайла для отправки
   */
  max_item_size: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Максимальное количество аудиовложений на сообщение
   */
  max_items_count: S.optionalWith(S.Int, { nullable: true }),
}) {}

/**
 * Поддержка файловых сообщений
 */
export class FileMessageSetting extends S.Class<FileMessageSetting>(
  "@integratop/retailcrm-transport-api-effect/FileMessageSetting",
)({
  creating: S.optionalWith(ChannelFeature, { nullable: true }),
  deleting: S.optionalWith(ChannelFeature, { nullable: true }),
  editing: S.optionalWith(ChannelFeature, { nullable: true }),
  quoting: S.optionalWith(ChannelFeature, { nullable: true }),
  reaction: S.optionalWith(ChannelFeature, { nullable: true }),
  /**
   * Максимальный размер файла для отправки
   */
  max_item_size: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Максимальное количество файловых вложений на сообщение
   */
  max_items_count: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Максимальное количество символов в аннотации файлового сообщения
   */
  note_max_chars_count: S.optionalWith(S.Int, { nullable: true }),
}) {}

/**
 * Поддержка медиа-сообщений
 */
export class ImageMessageSetting extends S.Class<ImageMessageSetting>(
  "@integratop/retailcrm-transport-api-effect/ImageMessageSetting",
)({
  creating: S.optionalWith(ChannelFeature, { nullable: true }),
  deleting: S.optionalWith(ChannelFeature, { nullable: true }),
  editing: S.optionalWith(ChannelFeature, { nullable: true }),
  quoting: S.optionalWith(ChannelFeature, { nullable: true }),
  reaction: S.optionalWith(ChannelFeature, { nullable: true }),
  /**
   * Максимальный размер изображения для отправки
   */
  max_item_size: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Максимальное количество медиа-вложений на сообщение
   */
  max_items_count: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Максимальное количество символов в аннотации медиа-сообщения
   */
  note_max_chars_count: S.optionalWith(S.Int, { nullable: true }),
}) {}

/**
 * Поддержка сообщений о заказах
 */
export class OrderMessageSetting extends S.Class<OrderMessageSetting>(
  "@integratop/retailcrm-transport-api-effect/OrderMessageSetting",
)({
  creating: S.optionalWith(ChannelFeature, { nullable: true }),
  deleting: S.optionalWith(ChannelFeature, { nullable: true }),
  editing: S.optionalWith(ChannelFeature, { nullable: true }),
  reaction: S.optionalWith(ChannelFeature, { nullable: true }),
  quoting: S.optionalWith(ChannelFeature, { nullable: true }),
}) {}

/**
 * Поддержка сообщений о продуктах
 */
export class ProductMessageSetting extends S.Class<ProductMessageSetting>(
  "@integratop/retailcrm-transport-api-effect/ProductMessageSetting",
)({
  creating: S.optionalWith(ChannelFeature, { nullable: true }),
  deleting: S.optionalWith(ChannelFeature, { nullable: true }),
  editing: S.optionalWith(ChannelFeature, { nullable: true }),
  reaction: S.optionalWith(ChannelFeature, { nullable: true }),
  quoting: S.optionalWith(ChannelFeature, { nullable: true }),
}) {}

/**
 * Поддержка внешних идентификаторов клиентов
 */
export class CustomerExternalId extends S.Literal("any", "phone") {}

/**
 * Типы сообщений, отправляемых после истечения времени ответа
 */
export class SendingPolicyAfterReplyTimeout extends S.Literal("no", "template") {}

/**
 * Типы сообщений для отправки новому клиенту
 */
export class SendingPolicyNewCustomer extends S.Literal("no", "template", "text") {}

/**
 * Поддержка исходящих сообщений
 */
export class SendingPolicyOutgoing extends S.Literal("allowed", "restricted") {}

/**
 * Политика отправки сообщений
 */
export class SendingPolicy extends S.Class<SendingPolicy>(
  "@integratop/retailcrm-transport-api-effect/SendingPolicy",
)({
  after_reply_timeout: S.optionalWith(SendingPolicyAfterReplyTimeout, { nullable: true }),
  new_customer: S.optionalWith(SendingPolicyNewCustomer, { nullable: true }),
  outgoing: S.optionalWith(SendingPolicyOutgoing, { nullable: true }),
}) {}

/**
 * Передача информации о статусе сообщения
 */
export class StatusSetting extends S.Class<StatusSetting>(
  "@integratop/retailcrm-transport-api-effect/StatusSetting",
)({
  delivered: S.optionalWith(ChannelFeature, { nullable: true }),
  read: S.optionalWith(ChannelFeature, { nullable: true }),
}) {}

/**
 * Поддержка типов быстрых ответов
 */
export class Suggestions extends S.Class<Suggestions>(
  "@integratop/retailcrm-transport-api-effect/Suggestions",
)({
  email: S.optionalWith(ChannelFeature, { nullable: true }),
  phone: S.optionalWith(ChannelFeature, { nullable: true }),
  text: S.optionalWith(ChannelFeature, { nullable: true }),
  url: S.optionalWith(ChannelFeature, { nullable: true }),
}) {}

/**
 * Поддержка шаблонов сообщений
 */
export class TemplateSetting extends S.Class<TemplateSetting>(
  "@integratop/retailcrm-transport-api-effect/TemplateSetting",
)({
  /**
   * Поддержка создания шаблонов в системе
   */
  creation: S.optionalWith(S.Boolean, { nullable: true }),
}) {}

/**
 * Качество канала WhatsApp
 */
export class WAChannelQuality extends S.Literal("high", "medium", "low") {}

/**
 * Статус канала WhatsApp
 */
export class WAChannelStatus extends S.Literal(
  "connected",
  "flagged",
  "offline",
  "pending",
  "restricted",
) {}

/**
 * Свойства канала WhatsApp
 */
export class WAChannelProperties extends S.Class<WAChannelProperties>(
  "@integratop/retailcrm-transport-api-effect/WAChannelProperties",
)({
  channel_quality: S.optionalWith(WAChannelQuality, { nullable: true }),
  channel_status: S.optionalWith(WAChannelStatus, { nullable: true }),
  tier: S.optionalWith(S.Int, { nullable: true }),
}) {}

/**
 * Поддержка работы с реакциями для сообщений
 */
export class Reactions extends S.Class<Reactions>(
  "@integratop/retailcrm-transport-api-effect/Reactions",
)({
  /**
   * Словарь доступных реакций
   */
  dictionary: S.optionalWith(S.Array(S.String), { nullable: true }),
  /**
   * Максимальное количество реакций, добавляемых системой
   */
  max_count: S.optionalWith(S.Int, { nullable: true }),
}) {}

/**
 * Настройки канала
 */
export class ChannelSettings extends S.Class<ChannelSettings>(
  "@integratop/retailcrm-transport-api-effect/ChannelSettings",
)({
  text: S.optionalWith(TextMessageSetting, { nullable: true }),
  audio: S.optionalWith(AudioMessageSetting, { nullable: true }),
  file: S.optionalWith(FileMessageSetting, { nullable: true }),
  image: S.optionalWith(ImageMessageSetting, { nullable: true }),
  order: S.optionalWith(OrderMessageSetting, { nullable: true }),
  product: S.optionalWith(ProductMessageSetting, { nullable: true }),
  customer_external_id: S.optionalWith(CustomerExternalId, { nullable: true }),
  sending_policy: S.optionalWith(SendingPolicy, { nullable: true }),
  status: S.optionalWith(StatusSetting, { nullable: true }),
  suggestions: S.optionalWith(Suggestions, { nullable: true }),
  template: S.optionalWith(TemplateSetting, { nullable: true }),
  whatsapp: S.optionalWith(WAChannelProperties, { nullable: true }),
  reactions: S.optionalWith(Reactions, { nullable: true }),
}) {}

/**
 * Канал
 */
export class Channel extends S.Class<Channel>("@integratop/retailcrm-transport-api-effect/Channel")(
  {
    id: S.Int,
    external_id: S.optionalWith(S.String, { nullable: true }),
    name: S.optionalWith(S.String, { nullable: true }),
    type: ChannelType,
    is_active: S.Boolean,
    settings: S.optionalWith(ChannelSettings, { nullable: true }),
    created_at: S.String,
    updated_at: S.optionalWith(S.String, { nullable: true }),
    activated_at: S.String,
    deactivated_at: S.optionalWith(S.String, { nullable: true }),
  },
) {}

export class ListChannels200 extends S.Array(Channel) {}

export class ListChannelsDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class ActivateChannel200 extends S.Struct({
  /**
   * Идентификатор канала
   */
  id: S.Int,
  /**
   * Дата и время активации канала
   */
  activated_at: S.String,
}) {}

export class ActivateChannel201 extends S.Struct({
  /**
   * Идентификатор канала
   */
  id: S.Int,
  /**
   * Дата и время активации канала
   */
  activated_at: S.String,
}) {}

export class ActivateChannelDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class UpdateChannelParams extends S.Struct({}) {}

export class UpdateChannel200 extends S.Struct({
  /**
   * Идентификатор канала
   */
  id: S.Int,
  /**
   * Дата и время последнего обновления
   */
  updated_at: S.String,
}) {}

export class UpdateChannelDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class DeactivateChannelParams extends S.Struct({}) {}

export class DeactivateChannel200 extends S.Struct({
  /**
   * Идентификатор деактивированного канала
   */
  id: S.Int,
  /**
   * Дата и время деактивации канала
   */
  deactivated_at: S.String,
}) {}

export class DeactivateChannelDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class UploadFileRequest extends S.instanceOf(globalThis.Blob) {}

/**
 * Тип файла
 */
export class FileType extends S.Literal("none", "image", "video", "file", "audio") {}

/**
 * Основная информация о файле
 */
export class FileBase extends S.Class<FileBase>(
  "@integratop/retailcrm-transport-api-effect/FileBase",
)({
  /**
   * UUID загруженного файла
   */
  id: S.String,
  /**
   * Размер файла (в байтах)
   */
  size: S.Int,
  type: FileType,
}) {}

export class UploadFileDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class UploadFileByUrlDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class GetFileUrlParams extends S.Struct({}) {}

/**
 * Основная информация о файле
 */
export class File extends S.Class<File>("@integratop/retailcrm-transport-api-effect/File")({
  /**
   * URL для скачивания файла
   */
  Url: S.optionalWith(S.String, { nullable: true }),
  /**
   * MIME-тип файла
   */
  mime_type: S.optionalWith(S.String, { nullable: true }),
  /**
   * UUID загруженного файла
   */
  id: S.String,
  /**
   * Размер файла (в байтах)
   */
  size: S.Int,
  type: FileType,
}) {}

export class GetFileUrlDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class ActivateTemplateParams extends S.Struct({}) {}

export class ActivateTemplate200 extends S.Struct({}) {}

export class ActivateTemplateDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class UpdateTemplateParams extends S.Struct({}) {}

export class UpdateTemplate200 extends S.Struct({}) {}

export class UpdateTemplateDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class DeactivateTemplateParams extends S.Struct({}) {}

export class DeactivateTemplate200 extends S.Struct({}) {}

export class DeactivateTemplateDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

/**
 * Пример вложения шаблона
 */
export class TemplateExampleAttachment extends S.Class<TemplateExampleAttachment>(
  "@integratop/retailcrm-transport-api-effect/TemplateExampleAttachment",
)({
  /**
   * UID загруженного файла
   */
  id: S.String,
  /**
   * Оригинальное имя файла
   */
  caption: S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(1024)), { nullable: true }),
}) {}

/**
 * Пример шаблона
 */
export class TemplateExample extends S.Class<TemplateExample>(
  "@integratop/retailcrm-transport-api-effect/TemplateExample",
)({
  /**
   * Вложения шаблона
   */
  attachments: S.optionalWith(S.Array(TemplateExampleAttachment), { nullable: true }),
  /**
   * Массив примерных значений тела шаблона
   */
  body: S.optionalWith(S.Array(S.String), { nullable: true }),
  /**
   * Массив примерных значений кнопок шаблона
   */
  buttons: S.optionalWith(S.Array(S.Array(S.String)), { nullable: true }),
  /**
   * Массив примерных значений для секции заголовка шаблона
   */
  header: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

/**
 * Тип шаблона
 */
export class TemplateType extends S.Literal("text", "media") {}

/**
 * Причина отклонения шаблона (для статуса `Rejected`)
 */
export class RejectReason extends S.Literal(
  "abusive_content",
  "incorrect_category",
  "invalid_format",
  "scam",
) {}

/**
 * Статус верификации шаблона
 */
export class TemplateVerificationStatus extends S.Literal(
  "approved",
  "pending",
  "rejected",
  "paused",
  "disabled",
) {}

/**
 * Тип кнопки
 */
export class TemplateButtonType extends S.Literal("plain", "phone", "url") {}

/**
 * Кнопка шаблона
 */
export class TemplateButton extends S.Class<TemplateButton>(
  "@integratop/retailcrm-transport-api-effect/TemplateButton",
)({
  /**
   * Название кнопки
   */
  label: S.String,
  type: TemplateButtonType,
  /**
   * Номер телефона (для типа кнопки `phone`)
   */
  phone: S.optionalWith(S.String, { nullable: true }),
  /**
   * URL (для типа кнопки `url`)
   */
  url: S.optionalWith(S.String, { nullable: true }),
}) {}

/**
 * Список кнопок шаблона
 */
export class TemplateButtons extends S.Class<TemplateButtons>(
  "@integratop/retailcrm-transport-api-effect/TemplateButtons",
)({
  items: S.optionalWith(S.Array(TemplateButton), { nullable: true }),
}) {}

/**
 * Тип секции заголовка
 */
export class TemplateHeaderContentType extends S.Literal("text", "document", "image", "video") {}

/**
 * Содержимое заголовка шаблона
 */
export class TemplateHeaderContent extends S.Class<TemplateHeaderContent>(
  "@integratop/retailcrm-transport-api-effect/TemplateHeaderContent",
)({
  type: TemplateHeaderContentType,
  /**
   * Текстовое содержимое секции заголовка (для типа контента `text`)
   */
  body: S.optionalWith(S.String, { nullable: true }),
}) {}

/**
 * Секция заголовка шаблона
 */
export class TemplateHeader extends S.Class<TemplateHeader>(
  "@integratop/retailcrm-transport-api-effect/TemplateHeader",
)({
  content: S.optionalWith(TemplateHeaderContent, { nullable: true }),
}) {}

/**
 * Тип элемента шаблона
 */
export class TemplateItemType extends S.Literal(1, 2) {}

/**
 * Тип переменной шаблона
 */
export class TemplateVarType extends S.Literal(0, 1, 2, 3) {}

/**
 * Элемент шаблона
 */
export class TemplateItem extends S.Class<TemplateItem>(
  "@integratop/retailcrm-transport-api-effect/TemplateItem",
)({
  type: S.optionalWith(TemplateItemType, { nullable: true }),
  /**
   * Текст элемента шаблона (для типа `text`)
   */
  text: S.optionalWith(S.String, { nullable: true }),
  /**
   * Переменная шаблона (для типа `var`)
   */
  var: S.optionalWith(TemplateVarType, { nullable: true }),
}) {}

/**
 * Качество шаблона
 */
export class TemplateQuality extends S.Literal("pending", "high", "medium", "low") {}

/**
 * Базовый шаблон
 */
export class Template extends S.Class<Template>(
  "@integratop/retailcrm-transport-api-effect/Template",
)({
  /**
   * Идентификатор шаблона
   */
  id: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Идентификатор канала
   */
  channel_id: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Индикатор активности шаблона
   */
  enabled: S.optionalWith(S.Boolean, { nullable: true }),
  example: S.optionalWith(TemplateExample, { nullable: true }),
  /**
   * Уникальный код шаблона
   */
  code: S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(512)), { nullable: true }),
  type: S.optionalWith(TemplateType, { nullable: true }),
  /**
   * Язык шаблона
   */
  lang: S.optionalWith(S.String, { nullable: true }),
  /**
   * Категория шаблона
   */
  category: S.optionalWith(S.String, { nullable: true }),
  rejection_reason: S.optionalWith(RejectReason, { nullable: true }),
  /**
   * Подвал шаблона
   */
  footer: S.optionalWith(S.String, { nullable: true }),
  verification_status: S.optionalWith(TemplateVerificationStatus, { nullable: true }),
  /**
   * Тело шаблона
   */
  body: S.optionalWith(S.String, { nullable: true }),
  buttons: S.optionalWith(TemplateButtons, { nullable: true }),
  header: S.optionalWith(TemplateHeader, { nullable: true }),
  /**
   * Название шаблона
   */
  name: S.optionalWith(S.String.pipe(S.minLength(1), S.maxLength(512)), { nullable: true }),
  template: S.optionalWith(S.Array(TemplateItem), { nullable: true }),
  quality: S.optionalWith(TemplateQuality, { nullable: true }),
}) {}

export class GetTemplates200 extends S.Array(Template) {}

export class GetTemplatesDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class EditMessage200 extends S.Struct({}) {}

export class EditMessageDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class SendMessage200 extends S.Struct({
  /**
   * Идентификатор созданного сообщения
   */
  message_id: S.Int,
  /**
   * Время создания сообщения
   */
  time: S.String,
  /**
   * Предупреждения, возникшие при создании сообщения
   */
  warnings: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class SendMessageDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

/**
 * Определяет возможные действия с сообщением
 */
export class MessageAction extends S.Literal("edit", "delete", "quote") {}

/**
 * Диалог сообщения
 */
export class MessageDialog extends S.Class<MessageDialog>(
  "@integratop/retailcrm-transport-api-effect/MessageDialog",
)({
  /**
   * Идентификатор диалога
   */
  id: S.Int,
}) {}

/**
 * Код ошибки сообщения
 */
export class MessageErrorCode extends S.Literal(
  "unknown",
  "network_error",
  "malformed_response",
  "async_send_timeout",
  "general",
  "customer_not_exists",
  "reply_timed_out",
  "spam_suspicion",
  "access_restricted",
) {}

/**
 * Подробности ошибки сообщения (только для сообщений со статусом `failed`)
 */
export class MessageError extends S.Class<MessageError>(
  "@integratop/retailcrm-transport-api-effect/MessageError",
)({
  code: MessageErrorCode,
  /**
   * Текстовое описание ошибки
   */
  message: S.optionalWith(S.String, { nullable: true }),
}) {}

/**
 * Тип пользователя
 */
export class UserType extends S.Literal("user", "bot", "customer", "channel") {}

/**
 * Сведения о пользователе
 */
export class UserRef extends S.Class<UserRef>("@integratop/retailcrm-transport-api-effect/UserRef")(
  {
    /**
     * Идентификатор пользователя
     */
    id: S.Int,
    /**
     * Индикатор статуса пользователя (только для пользователей типа "пользователь")
     */
    available: S.optionalWith(S.Boolean, { nullable: true }),
    /**
     * Аватар пользователя
     */
    avatar: S.optionalWith(S.String, { nullable: true }),
    /**
     * Электронная почта пользователя (только для пользователей типа "клиент")
     */
    email: S.optionalWith(S.String, { nullable: true }),
    /**
     * Внешний идентификатор пользователя
     */
    external_id: S.String,
    /**
     * Имя пользователя (только для типов "клиент" и "пользователь")
     */
    first_name: S.optionalWith(S.String, { nullable: true }),
    /**
     * Индикатор блокировки пользователя (только для пользователей типа "клиент")
     */
    is_blocked: S.optionalWith(S.Boolean, { nullable: true }),
    /**
     * Индикатор системного пользователя (только для пользователей типа "бот")
     */
    is_system: S.optionalWith(S.Boolean, { nullable: true }),
    /**
     * Индикатор технической учётной записи (только для пользователей типа "пользователь")
     */
    is_technical_account: S.optionalWith(S.Boolean, { nullable: true }),
    /**
     * Фамилия пользователя (только для типов "клиент" и "пользователь")
     */
    last_name: S.optionalWith(S.String, { nullable: true }),
    /**
     * Никнейм пользователя
     */
    name: S.String,
    /**
     * Номер телефона пользователя
     */
    phone: S.optionalWith(S.String, { nullable: true }),
    type: UserType,
    /**
     * Имя пользователя (только для типа "клиент")
     */
    username: S.optionalWith(S.String, { nullable: true }),
  },
) {}

/**
 * Звуковая диаграмма (только для сообщений типа "аудио")
 */
export class Histogram extends S.Array(S.Int) {}

/**
 * Прикреплённый файл сообщения
 */
export class MessageFile extends S.Class<MessageFile>(
  "@integratop/retailcrm-transport-api-effect/MessageFile",
)({
  /**
   * UUID прикреплённого файла
   */
  id: S.optionalWith(S.String, { nullable: true }),
  /**
   * Текстовое описание медиа-вложения
   */
  caption: S.optionalWith(S.String, { nullable: true }),
  /**
   * Длительность аудиозаписи (только для сообщений типа "аудио")
   */
  duration: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Размер вложения (в байтах)
   */
  size: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Высота изображения в пикселях (только для сообщений типа "изображение")
   */
  height: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Ширина изображения в пикселях (только для сообщений типа "изображение")
   */
  width: S.optionalWith(S.Int, { nullable: true }),
  histogram: S.optionalWith(Histogram, { nullable: true }),
  kind: S.optionalWith(FileType, { nullable: true }),
  /**
   * URL для предпросмотра или скачивания файла
   */
  preview_url: S.optionalWith(S.String, { nullable: true }),
  /**
   * Транскрипция загруженного файла
   */
  transcription: S.optionalWith(S.String, { nullable: true }),
  /**
   * Тип вложения
   */
  type: S.optionalWith(S.String, { nullable: true }),
}) {}

/**
 * Представляет денежную сумму с соответствующей валютой
 */
export class Cost extends S.Class<Cost>("@integratop/retailcrm-transport-api-effect/Cost")({
  /**
   * Код валюты
   */
  currency: S.String.pipe(S.minLength(3), S.maxLength(3)),
  /**
   * Числовое значение стоимости
   */
  value: S.Number.pipe(S.greaterThanOrEqualTo(0)),
}) {}

/**
 * Информация о доставке заказа
 */
export class MessageOrderDelivery extends S.Class<MessageOrderDelivery>(
  "@integratop/retailcrm-transport-api-effect/MessageOrderDelivery",
)({
  /**
   * Адрес доставки
   */
  address: S.optionalWith(S.String, { nullable: true }),
  /**
   * Комментарий к доставке
   */
  comment: S.optionalWith(S.String, { nullable: true }),
  /**
   * Название способа доставки
   */
  name: S.optionalWith(S.String, { nullable: true }),
  price: S.optionalWith(Cost, { nullable: true }),
}) {}

/**
 * Количество
 */
export class Quantity extends S.Class<Quantity>(
  "@integratop/retailcrm-transport-api-effect/Quantity",
)({
  /**
   * Единицы измерения
   */
  unit: S.optionalWith(S.String.pipe(S.maxLength(16)), { nullable: true }),
  /**
   * Количественное значение
   */
  value: S.optionalWith(S.Number.pipe(S.greaterThanOrEqualTo(0)), { nullable: true }),
}) {}

/**
 * Товар заказа
 */
export class MessageOrderItem extends S.Class<MessageOrderItem>(
  "@integratop/retailcrm-transport-api-effect/MessageOrderItem",
)({
  /**
   * Внешний идентификатор товара
   */
  external_id: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Изображение товара
   */
  img: S.optionalWith(S.String.pipe(S.maxLength(2048)), { nullable: true }),
  /**
   * Название товара
   */
  name: S.optionalWith(S.String.pipe(S.maxLength(255)), { nullable: true }),
  price: S.optionalWith(Cost, { nullable: true }),
  quantity: S.optionalWith(Quantity, { nullable: true }),
  /**
   * URL товара
   */
  url: S.optionalWith(S.String.pipe(S.maxLength(2048)), { nullable: true }),
}) {}

/**
 * Статус оплаты заказа
 */
export class MessageOrderPaymentStatus extends S.Class<MessageOrderPaymentStatus>(
  "@integratop/retailcrm-transport-api-effect/MessageOrderPaymentStatus",
)({
  /**
   * Название оплаты
   */
  name: S.optionalWith(S.String, { nullable: true }),
  /**
   * Индикатор выполнения оплаты
   */
  payed: S.optionalWith(S.Boolean, { nullable: true }),
}) {}

/**
 * Информация об оплате заказа
 */
export class MessageOrderPayment extends S.Class<MessageOrderPayment>(
  "@integratop/retailcrm-transport-api-effect/MessageOrderPayment",
)({
  amount: S.optionalWith(Cost, { nullable: true }),
  /**
   * Название оплаты
   */
  name: S.optionalWith(S.String, { nullable: true }),
  status: S.optionalWith(MessageOrderPaymentStatus, { nullable: true }),
}) {}

/**
 * Код статуса
 */
export class MessageOrderStatusCode extends S.Literal(
  "new",
  "approval",
  "assembling",
  "delivery",
  "complete",
  "cancel",
) {}

/**
 * Статус заказа
 */
export class MessageOrderStatus extends S.Class<MessageOrderStatus>(
  "@integratop/retailcrm-transport-api-effect/MessageOrderStatus",
)({
  code: S.optionalWith(MessageOrderStatusCode, { nullable: true }),
  /**
   * Название статуса
   */
  name: S.optionalWith(S.String.pipe(S.maxLength(255)), { nullable: true }),
}) {}

/**
 * Представляет детали заказа в сообщении
 */
export class MessageOrder extends S.Class<MessageOrder>(
  "@integratop/retailcrm-transport-api-effect/MessageOrder",
)({
  /**
   * Внешний идентификатор заказа
   */
  external_id: S.optionalWith(S.Int, { nullable: true }),
  cost: S.optionalWith(Cost, { nullable: true }),
  /**
   * Дата создания заказа
   */
  date: S.optionalWith(S.String, { nullable: true }),
  delivery: S.optionalWith(MessageOrderDelivery, { nullable: true }),
  discount: S.optionalWith(Cost, { nullable: true }),
  /**
   * Массив товаров заказа
   */
  items: S.optionalWith(S.Array(MessageOrderItem), { nullable: true }),
  /**
   * Номер заказа
   */
  number: S.optionalWith(S.String.pipe(S.maxLength(255)), { nullable: true }),
  /**
   * Массив платежей
   */
  payments: S.optionalWith(S.Array(MessageOrderPayment), { nullable: true }),
  status: S.optionalWith(MessageOrderStatus, { nullable: true }),
  /**
   * URL заказа
   */
  url: S.optionalWith(S.String.pipe(S.maxLength(2048)), { nullable: true }),
}) {}

/**
 * Описывает товар, упомянутый в сообщении
 */
export class MessageProduct extends S.Class<MessageProduct>(
  "@integratop/retailcrm-transport-api-effect/MessageProduct",
)({
  /**
   * Идентификатор товара
   */
  id: S.Int,
  /**
   * Описание товара
   */
  article: S.optionalWith(S.String.pipe(S.maxLength(128)), { nullable: true }),
  cost: S.optionalWith(Cost, { nullable: true }),
  /**
   * URL изображения товара
   */
  img: S.optionalWith(S.String.pipe(S.maxLength(2048)), { nullable: true }),
  /**
   * Название товара
   */
  name: S.String.pipe(S.minLength(1), S.maxLength(255)),
  /**
   * Единицы измерения товара
   */
  unit: S.optionalWith(S.String.pipe(S.maxLength(16)), { nullable: true }),
  /**
   * URL товара
   */
  url: S.optionalWith(S.String.pipe(S.maxLength(2048)), { nullable: true }),
}) {}

/**
 * Область видимости сообщения
 */
export class MessageScope extends S.Literal("undefined", "public", "private") {}

/**
 * Статус сообщения
 */
export class MessageStatus extends S.Literal(
  "undefined",
  "received",
  "sending",
  "sent",
  "failed",
  "seen",
) {}

/**
 * Тип быстрого ответа
 */
export class SuggestionType extends S.Literal("text", "email", "phone", "url") {}

/**
 * Предложение быстрого ответа
 */
export class Suggestion extends S.Class<Suggestion>(
  "@integratop/retailcrm-transport-api-effect/Suggestion",
)({
  /**
   * Данные быстрого ответа
   */
  payload: S.optionalWith(S.String, { nullable: true }),
  /**
   * Название быстрого ответа
   */
  title: S.optionalWith(S.String, { nullable: true }),
  type: S.optionalWith(SuggestionType, { nullable: true }),
}) {}

/**
 * Транспортные вложения
 */
export class MessageTransportAttachments extends S.Class<MessageTransportAttachments>(
  "@integratop/retailcrm-transport-api-effect/MessageTransportAttachments",
)({
  /**
   * Быстрые ответы
   */
  suggestions: S.optionalWith(S.Array(Suggestion), { nullable: true }),
}) {}

/**
 * Тип сообщения
 */
export class MessageType extends S.Literal(
  "text",
  "system",
  "command",
  "order",
  "product",
  "file",
  "image",
  "audio",
) {}

/**
 * Системное действие сообщения (только для сообщений типа "системное")
 */
export class SystemAction extends S.Literal(
  "dialog_opened",
  "dialog_closed",
  "user_joined",
  "user_left",
  "dialog_assign",
  "customer_blocked",
  "customer_unblocked",
  "dialog_unassign",
) {}

/**
 * Цитируемое сообщение
 */
export class QuoteMessage extends S.Class<QuoteMessage>(
  "@integratop/retailcrm-transport-api-effect/QuoteMessage",
)({
  /**
   * Идентификатор цитируемого сообщения
   */
  id: S.optionalWith(S.Int, { nullable: true }),
  /**
   * Текст сообщения
   */
  content: S.optionalWith(S.String, { nullable: true }),
  from: S.optionalWith(UserRef, { nullable: true }),
  /**
   * Медиа-вложения цитируемого сообщения
   */
  items: S.optionalWith(S.Array(MessageFile), { nullable: true }),
  /**
   * Время отправки сообщения
   */
  time: S.optionalWith(S.String, { nullable: true }),
  type: S.optionalWith(MessageType, { nullable: true }),
}) {}

/**
 * Текстовое сообщение
 */
export class Message extends S.Class<Message>("@integratop/retailcrm-transport-api-effect/Message")(
  {
    /**
     * Идентификатор сообщения
     */
    id: S.Int,
    /**
     * Доступные действия для сообщения
     */
    actions: S.optionalWith(S.Array(MessageAction), { nullable: true }),
    /**
     * Идентификатор чата
     */
    chat_id: S.Int,
    dialog: S.optionalWith(MessageDialog, { nullable: true }),
    error: S.optionalWith(MessageError, { nullable: true }),
    from: S.optionalWith(UserRef, { nullable: true }),
    /**
     * Индикатор редактирования сообщения
     */
    is_edit: S.Boolean,
    /**
     * Индикатор прочтения сообщения
     */
    is_read: S.Boolean,
    items: S.optionalWith(S.Array(MessageFile), { nullable: true }),
    /**
     * Аннотация медиа-данных (для медиа-сообщений)
     */
    note: S.optionalWith(S.String, { nullable: true }),
    order: S.optionalWith(MessageOrder, { nullable: true }),
    product: S.optionalWith(MessageProduct, { nullable: true }),
    scope: MessageScope,
    status: MessageStatus,
    /**
     * Время создания сообщения
     */
    time: S.String,
    transport_attachments: S.optionalWith(MessageTransportAttachments, { nullable: true }),
    type: MessageType,
    action: SystemAction,
    responsible: S.optionalWith(UserRef, { nullable: true }),
    user: S.optionalWith(UserRef, { nullable: true }),
    /**
     * Текст сообщения
     */
    content: S.optionalWith(S.String, { nullable: true }),
    quote: S.optionalWith(QuoteMessage, { nullable: true }),
  },
) {}

export class DeleteMessageDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class SendHistoryMessage200 extends S.Struct({
  /**
   * Идентификатор созданного сообщения
   */
  message_id: S.Int,
  /**
   * Время создания сообщения
   */
  time: S.String,
  /**
   * Предупреждения, возникшие при создании сообщения
   */
  warnings: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class SendHistoryMessageDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class AckMessage200 extends S.Struct({}) {}

export class AckMessageDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class MarkMessageRead200 extends S.Struct({}) {}

export class MarkMessageReadDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class MarkMessagesReadUntil200 extends S.Struct({
  /**
   * Идентификаторы сообщений, отмеченных как прочитанные
   */
  ids: S.Array(S.Int),
}) {}

export class MarkMessagesReadUntilDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class RestoreMessageDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class AddMessageReaction200 extends S.Struct({}) {}

export class AddMessageReactionDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class DeleteMessageReaction200 extends S.Struct({}) {}

export class DeleteMessageReactionDefault extends S.Struct({
  /**
   * Список ошибок
   */
  errors: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export const make = (
  httpClient: HttpClient.HttpClient,
  options: {
    readonly transformClient?:
      | ((client: HttpClient.HttpClient) => Effect.Effect<HttpClient.HttpClient>)
      | undefined;
  } = {},
): Client => {
  const unexpectedStatus = (response: HttpClientResponse.HttpClientResponse) =>
    Effect.flatMap(
      Effect.orElseSucceed(response.json, () => "Unexpected status code"),
      (description) =>
        Effect.fail(
          new HttpClientError.ResponseError({
            request: response.request,
            response,
            reason: "StatusCode",
            description:
              typeof description === "string" ? description : JSON.stringify(description),
          }),
        ),
    );
  const withResponse: <A, E>(
    f: (response: HttpClientResponse.HttpClientResponse) => Effect.Effect<A, E>,
  ) => (request: HttpClientRequest.HttpClientRequest) => Effect.Effect<any, any> =
    options.transformClient
      ? (f) => (request) =>
          Effect.flatMap(
            Effect.flatMap(options.transformClient!(httpClient), (client) =>
              client.execute(request),
            ),
            f,
          )
      : (f) => (request) => Effect.flatMap(httpClient.execute(request), f);
  const decodeSuccess =
    <A, I, R>(schema: S.Schema<A, I, R>) =>
    (response: HttpClientResponse.HttpClientResponse) =>
      HttpClientResponse.schemaBodyJson(schema)(response);
  const decodeError =
    <const Tag extends string, A, I, R>(tag: Tag, schema: S.Schema<A, I, R>) =>
    (response: HttpClientResponse.HttpClientResponse) =>
      Effect.flatMap(HttpClientResponse.schemaBodyJson(schema)(response), (cause) =>
        Effect.fail(ClientError(tag, cause, response)),
      );
  return {
    httpClient,
    ListChannels: (options) =>
      HttpClientRequest.get(`/channels`).pipe(
        HttpClientRequest.setUrlParams({
          id: options?.["id"] as any,
          active: options?.["active"] as any,
          types: options?.["types"] as any,
          since: options?.["since"] as any,
          until: options?.["until"] as any,
          limit: options?.["limit"] as any,
        }),
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(ListChannels200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    ActivateChannel: () =>
      HttpClientRequest.post(`/channels`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "200": decodeSuccess(ActivateChannel200),
            "201": decodeSuccess(ActivateChannel201),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    UpdateChannel: (channelId, options) =>
      HttpClientRequest.put(`/channels/${channelId}`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(UpdateChannel200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    DeactivateChannel: (channelId, options) =>
      HttpClientRequest.del(`/channels/${channelId}`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(DeactivateChannel200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    UploadFile: (options) =>
      HttpClientRequest.post(`/files/upload`).pipe(
        HttpClientRequest.bodyFormDataRecord(options as any),
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(FileBase),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    UploadFileByUrl: () =>
      HttpClientRequest.post(`/files/upload_by_url`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(FileBase),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    GetFileUrl: (id, options) =>
      HttpClientRequest.get(`/files/${id}`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(File),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    ActivateTemplate: (channelId, options) =>
      HttpClientRequest.post(`/channels/${channelId}/templates`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(ActivateTemplate200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    UpdateTemplate: (channelId, templateCode, options) =>
      HttpClientRequest.put(`/channels/${channelId}/templates/${templateCode}`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(UpdateTemplate200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    DeactivateTemplate: (channelId, templateCode, options) =>
      HttpClientRequest.del(`/channels/${channelId}/templates/${templateCode}`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(DeactivateTemplate200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    GetTemplates: () =>
      HttpClientRequest.get(`/templates`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(GetTemplates200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    EditMessage: () =>
      HttpClientRequest.put(`/messages`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(EditMessage200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    SendMessage: () =>
      HttpClientRequest.post(`/messages`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(SendMessage200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    DeleteMessage: () =>
      HttpClientRequest.del(`/messages`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(Message),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    SendHistoryMessage: () =>
      HttpClientRequest.post(`/messages/history`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(SendHistoryMessage200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    AckMessage: () =>
      HttpClientRequest.post(`/messages/ack`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(AckMessage200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    MarkMessageRead: () =>
      HttpClientRequest.post(`/messages/read`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(MarkMessageRead200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    MarkMessagesReadUntil: () =>
      HttpClientRequest.post(`/messages/read_until`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(MarkMessagesReadUntil200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    RestoreMessage: () =>
      HttpClientRequest.post(`/messages/restore`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(Message),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    AddMessageReaction: () =>
      HttpClientRequest.post(`/messages/reaction`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(AddMessageReaction200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
    DeleteMessageReaction: () =>
      HttpClientRequest.del(`/messages/reaction`).pipe(
        withResponse(
          HttpClientResponse.matchStatus({
            "2xx": decodeSuccess(DeleteMessageReaction200),
            orElse: unexpectedStatus,
          }),
        ),
      ),
  };
};

export interface Client {
  readonly httpClient: HttpClient.HttpClient;
  /**
   * Возвращает список каналов
   */
  readonly ListChannels: (
    options?: typeof ListChannelsParams.Encoded | undefined,
  ) => Effect.Effect<typeof ListChannels200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Активирует новый канал с заданными параметрами
   */
  readonly ActivateChannel: () => Effect.Effect<
    typeof ActivateChannel200.Type | typeof ActivateChannel201.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  /**
   * Обновление параметров существующего канала
   */
  readonly UpdateChannel: (
    channelId: string,
    options?: typeof UpdateChannelParams.Encoded | undefined,
  ) => Effect.Effect<typeof UpdateChannel200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Деактивирует существующий канал
   */
  readonly DeactivateChannel: (
    channelId: string,
    options?: typeof DeactivateChannelParams.Encoded | undefined,
  ) => Effect.Effect<
    typeof DeactivateChannel200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  /**
   * Загружает файл в репозиторий и возвращает информацию о нём
   */
  readonly UploadFile: (
    options: typeof UploadFileRequest.Encoded,
  ) => Effect.Effect<typeof FileBase.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Загружает файл из внешних источников по URL
   */
  readonly UploadFileByUrl: () => Effect.Effect<
    typeof FileBase.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  /**
   * Возвращает информацию о файле по его UUID
   */
  readonly GetFileUrl: (
    id: string,
    options?: typeof GetFileUrlParams.Encoded | undefined,
  ) => Effect.Effect<typeof File.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Активирует новый шаблон сообщения для канала
   */
  readonly ActivateTemplate: (
    channelId: string,
    options?: typeof ActivateTemplateParams.Encoded | undefined,
  ) => Effect.Effect<typeof ActivateTemplate200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Обновление существующего шаблона сообщения для канала
   */
  readonly UpdateTemplate: (
    channelId: string,
    templateCode: string,
    options?: typeof UpdateTemplateParams.Encoded | undefined,
  ) => Effect.Effect<typeof UpdateTemplate200.Type, HttpClientError.HttpClientError | ParseError>;
  /**
   * Деактивирует существующий шаблон сообщения для канала
   */
  readonly DeactivateTemplate: (
    channelId: string,
    templateCode: string,
    options?: typeof DeactivateTemplateParams.Encoded | undefined,
  ) => Effect.Effect<
    typeof DeactivateTemplate200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  /**
   * Возвращает список доступных шаблонов сообщений для данного транспорта
   */
  readonly GetTemplates: () => Effect.Effect<
    typeof GetTemplates200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  /**
   * Изменяет созданное сообщение, если канал поддерживает такую операцию
   */
  readonly EditMessage: () => Effect.Effect<
    typeof EditMessage200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  /**
   * Отправляет сообщение
   */
  readonly SendMessage: () => Effect.Effect<
    typeof SendMessage200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  /**
   * Удаляет созданное сообщение, если канал поддерживает такую операцию
   */
  readonly DeleteMessage: () => Effect.Effect<
    typeof Message.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  /**
   * Отправляет сообщение из истории
   */
  readonly SendHistoryMessage: () => Effect.Effect<
    typeof SendHistoryMessage200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  /**
   * Подтверждает успешную доставку сообщения получателю во внешней системе
   */
  readonly AckMessage: () => Effect.Effect<
    typeof AckMessage200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  /**
   * Помечает сообщение как прочитанное
   */
  readonly MarkMessageRead: () => Effect.Effect<
    typeof MarkMessageRead200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  /**
   * Помечает все сообщения в канале как прочитанные до указанной метки времени
   */
  readonly MarkMessagesReadUntil: () => Effect.Effect<
    typeof MarkMessagesReadUntil200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  /**
   * Восстанавливает ранее удалённое сообщение и возвращает его
   */
  readonly RestoreMessage: () => Effect.Effect<
    typeof Message.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  /**
   * Добавляет одну из разрешённых каналом реакций к сообщению
   */
  readonly AddMessageReaction: () => Effect.Effect<
    typeof AddMessageReaction200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  /**
   * Удаляет реакцию из сообщения
   */
  readonly DeleteMessageReaction: () => Effect.Effect<
    typeof DeleteMessageReaction200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
}

export interface ClientError<Tag extends string, E> {
  readonly _tag: Tag;
  readonly request: HttpClientRequest.HttpClientRequest;
  readonly response: HttpClientResponse.HttpClientResponse;
  readonly cause: E;
}

class ClientErrorImpl extends Data.Error<{
  _tag: string;
  cause: any;
  request: HttpClientRequest.HttpClientRequest;
  response: HttpClientResponse.HttpClientResponse;
}> {}

export const ClientError = <Tag extends string, E>(
  tag: Tag,
  cause: E,
  response: HttpClientResponse.HttpClientResponse,
): ClientError<Tag, E> =>
  new ClientErrorImpl({
    _tag: tag,
    cause,
    response,
    request: response.request,
  }) as any;
