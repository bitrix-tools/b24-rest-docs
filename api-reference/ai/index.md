# AI в Битрикс24: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Методы `ai.engine.*` подключают к Битрикс24 собственный AI-сервис. С их помощью можно регистрировать новые сервисы, получать их список и удалять выбранные.

{% note warning "" %}

Перед регистрацией проверьте доступность URL внешнего обработчика в параметре `completions_url` и требования к обработке запросов.

{% endnote %}

> Быстрый переход: [все методы](#all-methods)

## Что учесть перед регистрацией

- укажите в `completions_url` валидный URL, который при проверке возвращает HTTP-статус `200`
- обрабатывайте запросы асинхронно: подтвердите прием HTTP-статусом `202`, затем отправьте результат в callback
- выберите значение `category` по сценарию сервиса: `text`, `image`, `audio`, `call`, `vision` или `classify`
- передавайте дополнительные параметры в `settings`

## Как начать работу

1. Подготовьте внешний endpoint
2. Зарегистрируйте сервис через [ai.engine.register](./ai-engine-register.md)
3. Проверьте регистрацию и параметры сервиса через [ai.engine.list](./ai-engine-list.md)
4. Удалите сервис через [ai.engine.unregister](./ai-engine-unregister.md), если он больше не нужен

## Как устроена интеграция

**Endpoint.** Битрикс24 отправляет POST-запросы во внешний endpoint через `completions_url`.

**Callback-механика.** После обработки сервис отправляет результат в `callbackUrl`, а информацию об ошибке в `errorCallbackUrl`.

Пример запроса от Битрикс24 к `completions_url` для категории `text`:

```json
{
    "prompt": "Подготовь краткое резюме встречи",
    "payload_raw": "Подготовь краткое резюме встречи",
    "payload_provider": "text",
    "payload_role": "Ты — помощник по подготовке резюме",
    "context": [
        {
            "role": "user",
            "content": "Обсудили сроки запуска и ответственных"
        }
    ],
    "payload_markers": {
        "language": "ru"
    },
    "payload_prompt_text": null,
    "auth": null,
    "category": "text",
    "ttl": 14400,
    "callbackUrl": "https://example.bitrix24.ru/bitrix/services/main/ajax.php?action=ai.controller.integration.thirdparty.callbackSuccess&hash=example&rid=example",
    "errorCallbackUrl": "https://example.bitrix24.ru/bitrix/services/main/ajax.php?action=ai.controller.integration.thirdparty.callbackError&hash=example&rid=example"
}
```

Endpoint должен принять POST-запрос не более чем за пять секунд и вернуть HTTP-статус `202` с JSON-ответом:

```json
{
    "result": "OK"
}
```

После обработки отправьте результат POST-запросом в `callbackUrl`:

```json
{
    "result": "Запуск запланирован на 15 сентября. Ответственный — Иван Петров."
}
```

Если обработка завершилась ошибкой, отправьте ее в `errorCallbackUrl`:

```json
{
    "message": "Provider temporarily unavailable",
    "code": 503,
    "api_request_completed": false
}
```

Параметр `api_request_completed` показывает, был ли выполнен запрос к AI-провайдеру. При значении `false` Битрикс24 восстанавливает списанный лимит. Параметр `ttl` задает плановый срок жизни задания в секундах. После его истечения ошибочный callback не принимается; успешный результат может быть принят, пока запись задания еще не удалена.

### Типовые ошибки регистрации

#|
|| **Код** | **Причина** | **Как исправить** ||
|| `ENGINE_REGISTER_ERROR_COMPLETIONS_URL_FAIL` | `completions_url` недоступен, невалиден или при проверке возвращает статус, отличный от `200` | Проверьте URL и настройте ответ со статусом `200` на проверочный GET-запрос ||
|| `ENGINE_REGISTER_ERROR_CATEGORY_FORMAT` | В `category` передано значение вне списка `text`, `image`, `audio`, `call`, `vision`, `classify` | Передайте одну из поддерживаемых категорий ||
|#

Полный список ошибок и параметров регистрации приведен в описании метода [ai.engine.register](./ai-engine-register.md).

{% note tip "" %}

Шаблон можно использовать как основу для собственного сервиса

[Скачать шаблон](https://helpdesk.bitrix24.ru/examples/endpoint.zip)

{% endnote %}

## Связь с приложением и доступом

**Приложение.** Сервис связан с приложением через поле `APP_CODE`. Его можно получить в ответе метода [ai.engine.list](./ai-engine-list.md). В контексте OAuth-приложения список содержит только сервисы текущего приложения.

**Вебхук.** Через вебхук можно фильтровать сервисы по любому `APP_CODE`.

## Обзор методов {#all-methods}

> Scope: [`ai_admin`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

#|
|| **Метод** | **Описание** ||
|| [ai.engine.register](./ai-engine-register.md) | Регистрирует пользовательский AI-сервис ||
|| [ai.engine.list](./ai-engine-list.md) | Получает список зарегистрированных AI-сервисов ||
|| [ai.engine.unregister](./ai-engine-unregister.md) | Удаляет зарегистрированный AI-сервис ||
|#
