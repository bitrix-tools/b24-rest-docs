
### Статусы и коды системных ошибок

HTTP-статус: **20х**, **40x**, **50x**

Описанные ниже ошибки могут возникнуть при вызове любого метода

#|
|| **Статус** | **Код**
**Текст ошибки** | **Описание** ||
|| `500` | `INTERNAL_SERVER_ERROR`
Internal server error | Возникла внутренняя ошибка сервера, обратитесь к администратору сервера или в [техническую поддержку Битрикс24](/bitrix-support.html) ||
|| `500` | `ERROR_UNEXPECTED_ANSWER`
Server returned an unexpected response | Возникла внутренняя ошибка сервера, обратитесь к администратору сервера или в [техническую поддержку Битрикс24](/bitrix-support.html) ||
|| `503` | `QUERY_LIMIT_EXCEEDED`
Too many requests | Превышен [лимит на интенсивность запросов](/limits.html) ||
|| `405` | `ERROR_BATCH_METHOD_NOT_ALLOWED`
Method is not allowed for batch usage | Текущий метод не разрешен для вызове с помощью [batch](/settings/how-to-call-rest-api/batch.html) ||
|| `400` | `ERROR_BATCH_LENGTH_EXCEEDED`
Max batch length exceeded | Превышена максимальная длина параметров, переданных в метод [batch](/settings/how-to-call-rest-api/batch.html) ||
|| `401` | `NO_AUTH_FOUND`
Wrong authorization data | Неверный [access-токен](/settings/oauth/index.html) или [код вебхука](/local-integrations/local-webhooks.html) ||
|| `400` | `INVALID_REQUEST`
Https required | Для вызовов методов требуется использовать протокол HTTPS ||
|| `503` | `OVERLOAD_LIMIT`
REST API is blocked due to overload | REST API заблокирован из-за перегрузки. Это ручная индивидуальная блокировка, для снятия необходимо обращаться в [техническую поддержку Битрикс24](/bitrix-support.html) ||
|| `403` | `ACCESS_DENIED`
REST API is available only on commercial plans | REST API доступен только на коммерческих планах ||
|| `403` | `INVALID_CREDENTIALS`
Invalid request credentials | У пользователя, с чьим [access-токеном](/settings/oauth/index.html) или [вебхуком](/local-integrations/local-webhooks.html) был вызван метод, не хватает прав ||
|| `404` | `ERROR_MANIFEST_IS_NOT_AVAILABLE`
Manifest is not available | Манифест недоступен ||
|| `403` | `insufficient_scope`
The request requires higher privileges than provided by the webhook token | Запрос требует более высоких привилегий, чем предоставляет токен [веб-хука](/local-integrations/local-webhooks.html) ||
|| `401` | `expired_token`
The access token provided has expired | Предоставленный [access-токен](/settings/oauth/index.html) доступа истек ||
|| `403` | `user_access_error`
The user does not have access to the application | Пользователь не имеет доступа к приложению. Это означает, что приложение установлено, но администратор портала разрешил доступ к этому приложению только конкретным пользователям ||
|| `500` | `PORTAL_DELETED`
Portal was deleted | Публичная часть сайта закрыта. Чтобы открыть публичную часть сайта на коробочной установке отключите опцию «Временное закрытие публичной части сайта». Путь к настройке: *Рабочий стол > Настройки > Настройки продукта > Настройки модулей > Главный модуль > Временное закрытие публичной части сайта* ||
|#

