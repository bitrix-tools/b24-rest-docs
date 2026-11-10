
### Статусы и коды системных ошибок

HTTP-статус: **4xx**, **5xx**

Описанные ниже ошибки возвращает сам REST API, а не логика конкретного метода. Они могут прийти в ответ на любой метод.

#|
|| **Статус** | **Код**
**Текст ошибки** | **Описание** ||
|| `500` | `INTERNAL_SERVER_ERROR`
Internal server error | Возникла внутренняя ошибка сервера. Повторите вызов, а если ошибка сохраняется, обратитесь к администратору сервера или в [техническую поддержку Битрикс24](/bitrix-support.html) ||
|| `500` | `ERROR_UNEXPECTED_ANSWER`
Server returned an unexpected response | Сервер вернул неожиданный ответ. Повторите вызов, а если ошибка сохраняется, обратитесь к администратору сервера или в [техническую поддержку Битрикс24](/bitrix-support.html) ||
|| `503` | `QUERY_LIMIT_EXCEEDED`
Too many requests | Превышен [лимит на интенсивность запросов](/limits.html) ||
|| `429` | `OPERATION_TIME_LIMIT`
Method is blocked due to operation time limit | Метод заблокирован из-за превышения [лимита на ресурсоемкость запросов](/limits.html). Блокировка снимается автоматически, когда накопленное время выполнения метода перестает превышать лимит ||
|| `401` | `NO_AUTH_FOUND`
Wrong authorization data | В запросе нет авторизационных данных: не передан ни [access-токен](/settings/oauth/index.html), ни [код вебхука](/local-integrations/local-webhooks.html) ||
|| `401` | `INVALID_REQUEST`
Https required | Методы вызываются только по протоколу HTTPS ||
|| `401` | `OVERLOAD_LIMIT`
REST API is blocked due to overload | REST API заблокирован из-за перегрузки. Это ручная индивидуальная блокировка. Чтобы ее снять, обратитесь в [техническую поддержку Битрикс24](/bitrix-support.html) ||
|| `401` | `ACCESS_DENIED`
REST is available only on commercial plans | REST API доступен только на коммерческих тарифах. У [вебхука](/local-integrations/local-webhooks.html) текст ошибки другой — `REST is available only by subscription` ||
|| `401` | `INVALID_CREDENTIALS`
Invalid request credentials | Не найден активный [вебхук](/local-integrations/local-webhooks.html) с указанным идентификатором пользователя и секретным кодом ||
|| `404` | `ERROR_METHOD_NOT_FOUND`
Method not found! | Метод с таким именем не найден. Имя написано с ошибкой, метода нет в REST API или он недоступен без нужного [скоупа](/api-reference/scopes/permissions.html) ||
|| `401` | `insufficient_scope`
The request requires higher privileges than provided by the webhook token | Запрос требует более широких прав, чем есть у токена: у [вебхука](/local-integrations/local-webhooks.html) это выданные ему права, у приложения — [скоуп](/api-reference/scopes/permissions.html). У приложения текст ошибки заканчивается на `provided by the access token` ||
|| `401` | `expired_token`
The access token provided has expired | Срок действия [access-токена](/settings/oauth/index.html) истек ||
|| `401` | `user_access_error`
The user does not have access to the application | Приложение установлено, но администратор Битрикс24 открыл доступ к нему только конкретным пользователям ||
|| `403` | `PORTAL_DELETED`
Portal was deleted | Публичная часть сайта закрыта. Чтобы открыть ее на коробочной установке, отключите опцию «Временное закрытие публичной части сайта». Путь к настройке: *Рабочий стол > Настройки > Настройки продукта > Настройки модулей > Главный модуль > Временное закрытие публичной части сайта* ||
|#

