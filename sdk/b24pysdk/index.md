# Установка и использование B24PySDK

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

B24PySDK - это официальный Python SDK для REST API Битрикс24. Он предоставляет удобный Python-интерфейс к методам API, поддерживает авторизацию через вебхуки и OAuth-протокол, проверяет типы и параметры запросов перед отправкой, возвращает данные в привычных для Python структурах и унифицирует обработку ошибок API.

В SDK есть интеграции для Django, FastAPI и Flask: они помогают валидировать данные, которые Битрикс24 передает при открытии приложения, вызове обработчиков событий и работе с бизнес-процессами.

Используйте B24PySDK:

- если разрабатываете приложение, интеграцию или автоматизацию на Python,
- нужно работать с REST API Битрикс24 без ручной сборки HTTP-запросов,
- важны автодополнение в IDE, проверка параметров запросов и предсказуемая структура ответов,
- планируется backend-приложение, которому нужно надежно обрабатывать авторизацию, события и ошибки API.

B24PySDK поддерживает:

1. Авторизацию через [входящие вебхуки](../../local-integrations/local-webhooks.md) и [OAuth-протокол](../../settings/oauth/index.md);
2. Подсказки типов и автодополнение в IDE для доступных методов и параметров;
3. Проверку типов аргументов перед отправкой запроса;
4. Типизированные адаптеры ответов через `.value` и `.values` для методов, у которых описаны Python-схемы результата;
5. Пагинацию списочных методов через `.as_list()` и `.as_list_fast()`;
6. Batch-запросы и единую обработку ошибок REST API;
7. Объектный слой `b24pysdk.objects`: типизированные Python-объекты поверх REST API, ленивая загрузка, менеджеры объектов, `filter`, `order`, `select`, batch-записи, связи и `select_related()`.

## Содержание {#contents}

- [Основные модули SDK](#modules)
- [Установка](#install)
- [Использование со входящими вебхуками](#webhook)
- [Получение bitrix_token в маркетных приложениях](#market-token)
- [Получение bitrix_token в локальных приложениях](#local-token)
- [Жизненный цикл OAuth-токена](#oauth-token-lifecycle)
- [Версии REST API](#rest-versions)
- [Ответы и запросы](#responses-and-requests)
- [Поддерживаемые методы SDK](#supported-methods)
- [Параметры методов и проверка типов](#method-params)
- [Списочные методы и большие выборки](#list-methods)
- [Прямые вызовы без обертки](#direct-calls)
- [Batch-запросы](#batch)
- [Обработка ошибок](#errors)
- [Валидация входящих данных от Битрикс24](#incoming-data)
- [Объектный слой](#objects)
- [Интеграция с Django](#django)
- [Интеграция с FastAPI](#fastapi)
- [Интеграция с Flask](#flask)
- [События токена](#token-events)
- [Настройка таймаутов, повторов и логирования](#config)
- [Константы](#constants)

## Основные модули SDK {#modules}

B24PySDK состоит из нескольких групп модулей, которые закрывают разные части работы с REST API:

- `b24pysdk.Client` - точка входа для вызова методов REST API. Через клиент доступны скоупы `crm`, `user`, `department`, `disk`, `bizproc`, `tasks` и другие.
- `b24pysdk.credentials` - классы авторизации: `BitrixWebhook`, `BitrixToken`, `BitrixTokenLocal`, `BitrixApp`, `BitrixAppLocal`, а также модели OAuth-данных, которые приходят от Битрикс24.
- `b24pysdk.api.requests` - объекты запросов, которые возвращают обертки методов: стандартные запросы, списочные запросы и batch-запросы.
- `b24pysdk.api.responses` - объекты ответов, которые дают доступ к `result`, `value`, `values`, `time`, `total`, `next` и другим данным ответа.
- `b24pysdk.schemas` - типизированные схемы для удобного Python-представления данных Битрикс24: профиля пользователя, информации о приложении, названий прав доступа, CRM-полей, CRM-перечислений, НДС, результатов объединения сущностей и данных ошибок API.
- `b24pysdk.objects` - типизированный объектный слой над поддерживаемыми REST-сущностями: объекты, дескрипторы полей, менеджеры объектов, связи, `BitrixObjectList` и результаты batch-операций.
- `b24pysdk.errors` - единая иерархия исключений для ошибок сети, HTTP-ответов, JSON, REST API, OAuth и валидации параметров.
- `b24pysdk.integrations` - интеграции для Django, FastAPI и Flask: декораторы, зависимости и вспомогательные функции для обработки входящих запросов от Битрикс24.
- `b24pysdk.constants` - константы для CRM, пользователей, задач, телефонии и других разделов API.
- `b24pysdk.events` и `b24pysdk.signals` - события SDK, например обновление OAuth-токена или автоматическая смена домена портала после редиректа. Для прямой подписки на сигналы установите дополнительный набор зависимостей `signals`.
- `b24pysdk.log` и `b24pysdk.Config` - настройка таймаутов, повторов, часового пояса и логирования.

Базовый импорт для большинства сценариев выглядит так:

```python
from b24pysdk import BitrixWebhook, Client
from b24pysdk.errors import BitrixAPIError, BitrixSDKException

bitrix_token = BitrixWebhook(
    domain="example.bitrix24.com",
    webhook_token="1/webhook_key",
)

client = Client(bitrix_token)
```

Клиент возвращает объект `BaseClient`, у которого методы сгруппированы по REST-скоупам:

```python
deal = client.crm.deal.get(bitrix_id=1).result
user = client.user.current().result
fields = client.crm.company.fields().result
```

## Установка {#install}

Для работы B24PySDK требуется Python 3.9 или выше. Для установки используйте `pip`:

```bash
pip install b24pysdk
```

Если вы используете интеграции с веб-фреймворками, установите SDK с нужным дополнительным набором зависимостей:

```bash
pip install "b24pysdk[django]"
pip install "b24pysdk[fastapi]"
pip install "b24pysdk[flask]"
```

Если приложение подписывается на внутренние события SDK, установите дополнительный набор `signals`:

```bash
pip install "b24pysdk[signals]"
```

Обычные REST-вызовы и автоматическое обновление OAuth-токена работают без этого набора. Он нужен только для прямого импорта `b24pysdk.signals` и подписки на сигналы SDK.

Репозиторий SDK доступен на GitHub: [bitrix24/b24pysdk](https://github.com/bitrix24/b24pysdk).

## Использование со входящими вебхуками {#webhook}

Чтобы подключить SDK к входящему вебхуку, передайте домен портала и код вебхука в формате `user_id/webhook_key`. Например, для вебхука `https://example.bitrix24.com/rest/1/abcdef/` доменом будет `example.bitrix24.com`, а кодом вебхука - `1/abcdef`.

```python
from b24pysdk import BitrixWebhook, Client

bitrix_token = BitrixWebhook(
    domain="example.bitrix24.com",
    webhook_token="1/webhook_key",
)

client = Client(bitrix_token)
```

Когда клиент инициирован, его можно использовать для вызова различных методов REST API. В примере ниже переменная `result` получит значение идентификатора сделки в результате ее создания:

```python
result = client.crm.deal.add(
    fields={
        "TITLE": "Новая сделка",
        "TYPE_ID": "SALE",
        "STAGE_ID": "NEW",
    }
).result
```

Если для нужного вам метода нет готовой обертки в SDK, вызовите REST-метод напрямую через `bitrix_token.call_method()`. Так можно вызвать любой метод REST API:

```python
response = bitrix_token.call_method(
    api_method="crm.deal.add",
    params={
        "fields": {
            "TITLE": "Новая сделка",
            "TYPE_ID": "SALE",
            "STAGE_ID": "NEW",
        },
    },
)

result = response["result"]
```

В этом случае вы сами указываете имя REST-метода и параметры запроса. SDK выполнит авторизованный HTTP-вызов, обработает сетевые ошибки и вернет JSON-ответ REST API. Автодополнение конкретной обертки метода в IDE не будет работать.

## Получение bitrix_token в маркетных приложениях {#market-token}

Для маркетного приложения используйте `BitrixApp` и OAuth-токены, которые Битрикс24 передал приложению. Домен портала передается явно:

```python
from b24pysdk import BitrixApp, BitrixToken, Client

bitrix_app = BitrixApp(
    client_id="put-your-client-id-here",
    client_secret="put-your-client-secret-here",
)

bitrix_token = BitrixToken(
    domain="example.bitrix24.com",
    auth_token="put-access-token-here",
    refresh_token="put-refresh-token-here",
    bitrix_app=bitrix_app,
)

client = Client(bitrix_token)
```

Значения `client_id` и `client_secret` берутся из настроек приложения. `auth_token` — текущий access token, `refresh_token` нужен SDK для автоматического обновления OAuth-токена.

## Получение bitrix_token в локальных приложениях {#local-token}

Для локального приложения используйте `BitrixAppLocal` и `BitrixTokenLocal`. В отличие от маркетного приложения, `BitrixAppLocal` привязан к конкретному порталу:

```python
from b24pysdk import BitrixAppLocal, BitrixTokenLocal, Client

bitrix_app = BitrixAppLocal(
    domain="example.bitrix24.com",
    client_id="put-your-client-id-here",
    client_secret="put-your-client-secret-here",
)

bitrix_token = BitrixTokenLocal(
    auth_token="put-access-token-here",
    refresh_token="put-refresh-token-here",
    bitrix_app=bitrix_app,
)

client = Client(bitrix_token)
```

В случае локального приложения, значения `domain`, `client_id` и `client_secret` берутся из настроек локального приложения в вашем Битрикс24. Список прав задается там же и определяет, какие REST-методы будут доступны полученному токену.

Инициировав объект `client`, вы можете использовать его для вызова различных методов REST API:

```python
result = client.crm.deal.add(
    fields={
        "TITLE": "Новая сделка",
        "TYPE_ID": "SALE",
        "STAGE_ID": "NEW",
    }
).result
```

## Жизненный цикл OAuth-токена {#oauth-token-lifecycle}

Для OAuth-приложений SDK предоставляет публичные методы получения, обновления и проверки токенов.

Через объект приложения:

```python
oauth_token = bitrix_app.get_oauth_token(code)
renewed_oauth = bitrix_app.refresh_oauth_token(refresh_token)
app_info = bitrix_app.get_app_info(auth_token)
```

Через объект токена:

```python
renewed_oauth = bitrix_token.refresh_oauth_token()
bitrix_token.refresh_and_set_oauth_token()
app_info = bitrix_token.get_app_info()
```

`refresh_oauth_token()` получает новые OAuth-данные и возвращает их, но не меняет текущий объект токена. `refresh_and_set_oauth_token()` получает новые OAuth-данные и сохраняет их в текущем `bitrix_token`.

Полезные свойства токена:

```python
oauth_token = bitrix_token.oauth_token

print(bitrix_token.has_expired)
print(bitrix_token.is_one_off)
print(bitrix_token.is_webhook)
```

Если клиент нужен из уже созданного токена, используйте `get_client()`:

```python
client = bitrix_token.get_client()
client_v3 = bitrix_token.get_client(prefer_version=3)
```

## Версии REST API {#rest-versions}

`Client` может работать с разными версиями REST API. Если версия не указана, SDK использует версию по умолчанию. Если нужно явно предпочесть API v3, передайте `prefer_version=3`:

```python
client = Client(bitrix_token, prefer_version=3)
```

Версия по умолчанию - v2. SDK поддерживает `prefer_version=1`, `prefer_version=2` и `prefer_version=3`. При `prefer_version=3` конкретный вызов пойдет через REST 3.0 только если SDK знает, что этот метод поддерживает новую версию API. Остальные совместимые вызовы будут выполнены через старую версию REST.

Список методов, которые SDK считает доступными в REST 3.0, хранится в `Config().api_v3_methods`. Его можно переопределить глобально:

```python
from b24pysdk import Config

Config().configure(
    api_v3_methods={
        "tasks.task.get",
        "tasks.task.list",
    },
)
```

У клиента v3 есть отдельные контексты для v3-методов:

- `call`;
- `documentation`;
- `humanresources`;
- `mail`;
- `main`;
- `note`;
- `rest`;
- `tasks`;
- `timeman`.

## Ответы и запросы {#responses-and-requests}

Методы SDK не отправляют запрос в момент создания объекта. Они возвращают объект запроса. Вызов выполняется при первом обращении к `.response`, `.result`, `.time`, `.value` или `.values`.

```python
request = client.crm.deal.get(bitrix_id=1)

deal = request.result
duration = request.time.duration
```

После первого выполнения ответ кэшируется. Повторный доступ к свойствам использует уже полученный ответ. Если нужно выполнить новый REST-запрос и заменить закэшированный ответ, вызовите `.call()`:

```python
request = client.crm.deal.get(bitrix_id=1)

first_response = request.response
fresh_response = request.call()
```

У объекта запроса доступны короткие свойства:

- `request.response` - объект ответа целиком;
- `request.result` - сырой результат Bitrix24;
- `request.value` - одно типизированное Python-значение;
- `request.values` - список или генератор адаптированных значений;
- `request.time` - служебная информация о времени выполнения.

`request.response` содержит те же данные на уровне объекта ответа:

- `response.result` - данные, которые вернул REST-метод;
- `response.value` - один адаптированный Python-объект для методов, у которых описана схема одиночного результата;
- `response.values` - список или генератор адаптированных Python-объектов для методов, которые возвращают набор значений;
- `response.time` - служебная информация о времени выполнения;
- `response.total` и `response.next` - доступны у списочных ответов, если API вернул данные пагинации.

```python
request = client.crm.deal.list(
    select=["ID", "TITLE", "STAGE_ID"],
    order={"ID": "ASC"},
)

response = request.response
print(response.result)
print(response.total)
print(response.next)
```

Для методов с типизированными адаптерами можно использовать `.value` или `.values`. Они преобразуют результат Битрикс24 в объекты из `b24pysdk.schemas`, но не заменяют `.result`: если нужен исходный API-ответ, продолжайте использовать `.result`.

```python
request = client.profile()

raw_profile = request.result
profile = request.value

print(raw_profile["ID"])
print(profile.bitrix_id)
```

Для методов, которые возвращают несколько однотипных значений, используйте `.values`:

```python
request = client.crm.enum.ownertype()

raw_owner_types = request.result
owner_types = request.values

print(raw_owner_types[0]["ID"])
print(owner_types[0].bitrix_id)
```

## Поддерживаемые методы SDK {#supported-methods}

Покрытие REST API в SDK постепенно расширяется. Чтобы проверить, какие методы-обертки доступны в установленной версии SDK, используйте методы клиента:

```python
all_methods = client.get_supported_api_methods()
deal_methods = client.get_supported_api_methods("crm.deal")

client.print_supported_api_methods("crm")
```

В `get_supported_api_methods()` можно передать строковый префикс или контекст клиента. Метод вернет список REST-методов, для которых в SDK есть обертки.

## Параметры методов и проверка типов {#method-params}

В обертках SDK параметры названы как Python-аргументы. Например, REST-параметр `ID` в методах получения сущностей обычно передается как `bitrix_id`, а объект `fields` остается словарем:

```python
result = client.crm.deal.update(
    bitrix_id=1,
    fields={
        "TITLE": "Новое название сделки",
    },
).result
```

SDK проверяет типы аргументов перед отправкой запроса. Это помогает поймать ошибку на стороне приложения, а не после ответа REST API. Передавайте значения того типа, который указан в подсказках IDE и сигнатуре метода.

## Списочные методы и большие выборки {#list-methods}

Обычный вызов списочного метода возвращает одну страницу данных. Для REST API Битрикс24 это обычно до 50 элементов:

```python
deals = client.crm.deal.list(
    select=["ID", "TITLE"],
    order={"ID": "ASC"},
).result
```

Если нужно получить все страницы, используйте `.as_list()`:

```python
deals = client.crm.deal.list(
    select=["ID", "TITLE"],
    order={"ID": "ASC"},
).as_list().result
```

Для больших таблиц используйте `.as_list_fast()`, когда метод поддерживает быструю выборку по `ID`:

```python
deals = client.crm.deal.list(
    select=["ID", "TITLE"],
).as_list_fast().result

for deal in deals:
    print(deal["ID"], deal["TITLE"])
```

`.as_list_fast()` возвращает генератор и делает запросы лениво во время обхода. Это удобно для больших объемов данных, когда не нужно держать всю выборку в памяти.

В исходный `.list()` для `.as_list_fast()` не передавайте `order`, `sort` и `start`: SDK сам управляет сортировкой и пагинацией по ID и вернет ошибку, если эти параметры уже есть в запросе. Направление обхода задавайте аргументом `descending=True`:

```python
deals = client.crm.deal.list(
    select=["ID", "TITLE"],
).as_list_fast(descending=True).result
```

`call_list_fast()` и `.as_list_fast()` пока не поддерживают REST 3.0. Для v3-методов используйте обычный вызов метода.

## Прямые вызовы без обертки {#direct-calls}

Если в SDK еще нет обертки для нужного REST-метода, можно вызвать API напрямую через методы `bitrix_token.call_*()`. Эти методы выполняют запрос сразу и возвращают исходный ответ в формате REST API:

```python
result = bitrix_token.call_method(
    "crm.deal.get",
    {
        "ID": 1,
    },
)

deals = bitrix_token.call_list(
    "crm.deal.list",
    {
        "select": ["ID", "TITLE"],
    },
)

fast_deals = bitrix_token.call_list_fast(
    "crm.deal.list",
    {
        "select": ["ID", "TITLE"],
    },
)

batch_result = bitrix_token.call_batch({
    "deal": ("crm.deal.get", {"ID": 1}),
    "fields": ("crm.deal.fields", {}),
})

batches_result = bitrix_token.call_batches([
    ("crm.deal.get", {"ID": 1}),
    ("crm.deal.get", {"ID": 2}),
])
```

Методы `Client` сначала создают объект запроса, а сам REST-вызов выполняется при обращении к результату. Методы `bitrix_token.call_*()` отправляют запрос сразу.

## Batch-запросы {#batch}

Если нужно выполнить несколько REST-вызовов за один запрос, используйте `client.call_batch()`. Он подходит для набора до 50 команд.

Команды можно передать словарем. Тогда в результате сохраняются ключи команд:

```python
requests_data = {
    "deal": client.crm.deal.get(bitrix_id=1),
    "fields": client.crm.deal.fields(),
}

batch_request = client.call_batch(requests_data)

print(batch_request.result.result["deal"])
print(batch_request.result.result["fields"])
```

Команды можно передать и списком. Тогда результат будет списком в том же порядке:

```python
requests_data = [
    client.crm.deal.get(bitrix_id=1),
    client.crm.deal.fields(),
]

batch_request = client.call_batch(requests_data)

for result in batch_request.result.result:
    print(result)
```

Если команд больше 50, используйте `client.call_batches()`. SDK разобьет запросы на несколько batch-вызовов. `call_batches()` тоже принимает словарь или список:

```python
requests = [
    client.crm.deal.get(bitrix_id=1),
    client.crm.deal.get(bitrix_id=2),
    client.crm.deal.get(bitrix_id=3),
]

batches_request = client.call_batches(requests)

for deal in batches_request.result.result:
    print(deal)
```

Batch-запросы принимают такие же ленивые объекты запросов, которые возвращают обычные методы SDK.

У `client.call_batch()` есть параметры `halt` и `ignore_size_limit`. `halt` управляет остановкой batch при ошибке команды, а `ignore_size_limit=True` отключает проверку лимита размера запроса на стороне SDK.

В batch-ответе доступны:

- `result` - успешные результаты команд;
- `result_error` - ошибки отдельных команд;
- `result_total` - значения `total` для команд;
- `result_next` - значения `next` для команд;
- `result_time` - служебное время выполнения команд.

Если команды переданы словарем, SDK сохраняет пользовательские ключи в `result`, `result_error`, `result_total`, `result_next` и `result_time`.

`client.call_batches()` автоматически делит команды на несколько batch-запросов и объединяет результаты в один ответ.

## Обработка ошибок {#errors}

Все исключения SDK наследуются от `BitrixSDKException`. Основные типы ошибок отличаются уровнем, на котором произошел сбой, и набором доступных полей:

| Тип ошибки | Когда возникает | Основные поля |
| --- | --- | --- |
| `BitrixRequestError`, `BitrixRequestTimeout` | Запрос не дошел до Битрикс24: проблема сети или таймаут | `message`, для таймаута - `timeout` |
| `BitrixResponseError` | Битрикс24 ответил, но ответ нельзя обработать как успешный | HTTP-данные ответа и `message` |
| `BitrixResponseJSONDecodeError` | Ответ нельзя разобрать как ожидаемый JSON | HTTP-данные ответа и `message` |
| `BitrixAPIError` из `b24pysdk.errors` | REST API v1/v2 вернул ошибку | `error`, `error_description` |
| `BitrixAPIError` из `b24pysdk.errors.v3` | REST API v3 вернул ошибку | `code`, `error.message`, `validation`, `has_validation` |

Для REST API v1/v2 Битрикс24 возвращает ошибку в старом формате: строковый код `error` и описание `error_description`. От `BitrixAPIError` наследуются более конкретные классы: `BitrixAPIExpiredToken` для истекшего OAuth-токена, `BitrixAPIInsufficientScope` для нехватки прав, `BitrixAPITooManyRequests`, `BitrixAPIQueryLimitExceeded`, `BitrixAPIOverloadLimit` для лимитов и перегрузки.

Для REST API v3 структура другая: внутри ответа приходит объект `error` с полями `code`, `message` и, если ошибка связана с параметрами запроса, списком `validation`. Поэтому v3-ошибки импортируются из `b24pysdk.errors.v3`.

API-ошибки наследуются через иерархию ошибок ответа. В SDK есть отдельные классы для HTTP/API-статусов, например `BitrixAPIBadRequest`, `BitrixAPIUnauthorized`, `BitrixAPIForbidden`, `BitrixAPINotFound`, `BitrixAPIServiceUnavailable` и другие. Для некоторых HTTP-статусов также есть отдельные классы ошибок разбора JSON.

Пример общей обработки ошибок:

```python
from b24pysdk.errors import (
    BitrixAPIError,
    BitrixAPIInsufficientScope,
    BitrixAPIQueryLimitExceeded,
    BitrixAPITooManyRequests,
    BitrixRequestTimeout,
    BitrixSDKException,
)

try:
    deal = client.crm.deal.get(bitrix_id=1).result
except BitrixRequestTimeout as error:
    print(f"Запрос превысил таймаут: {error.timeout}")
except BitrixAPIInsufficientScope as error:
    print(f"Недостаточно прав: {error.error_description}")
except (BitrixAPITooManyRequests, BitrixAPIQueryLimitExceeded) as error:
    print(f"Превышен лимит запросов: {error.error_description}")
except BitrixAPIError as error:
    print(
        "Ошибка REST API",
        f"error: {error.error}",
        f"error_description: {error.error_description}",
        sep="\n",
    )
except BitrixSDKException as error:
    print(f"Ошибка SDK: {error.message}")
else:
    print(deal)
```

Если нужно логировать все непредвиденные ошибки приложения, добавьте обычный `Exception` после обработки ошибок SDK:

```python
try:
    result = client.crm.deal.fields().result
except BitrixSDKException as error:
    print(f"Ошибка SDK: {error.message}")
except Exception as error:
    print(f"Непредвиденная ошибка приложения: {error}")
else:
    print(result)
```

Пример обработки ошибок REST API v3:

```python
from b24pysdk.errors.v3 import BitrixAPIError

try:
    result = client.tasks.task.get(bitrix_id=51).result
except BitrixAPIError as error:
    print(error.code)
    print(error.error.message)

    if error.has_validation:
        for issue in error.validation or []:
            print(issue.field, issue.message)
```

## Валидация входящих данных от Битрикс24 {#incoming-data}

Битрикс24 передает данные в приложение при открытии приложения внутри интерфейса, открытии виджета, вызове обработчиков событий и работе бизнес-процессов. Готовые интеграции SDK собирают параметры входящего запроса, проверяют входящие данные и возвращают типизированные данные:

- `OAuthPlacementData` - данные открытия приложения или виджета;
- `OAuthEventData` - данные обработчика события;
- `OAuthWorkflowData` - данные робота бизнес-процесса;
- `OAuth`, `EventOAuth`, `WorkflowOAuth`, `RenewedOAuth` - OAuth-данные внутри входящих данных.

Если передать `bitrix_app` в интеграции Django, FastAPI или Flask, SDK сможет дополнительно проверить входящие OAuth-данные через `app.info`.

Типизированные модели входящих данных можно использовать и без интеграций с веб-фреймворками. Передайте словарь входящих параметров в `from_dict()`, а при необходимости проверьте данные приложения через `validate_against_app_info()`:

```python
from b24pysdk.credentials import OAuthEventData, OAuthPlacementData, OAuthWorkflowData

placement_data = OAuthPlacementData.from_dict(placement_payload)
event_data = OAuthEventData.from_dict(event_payload)
workflow_data = OAuthWorkflowData.from_dict(workflow_payload)

payload = placement_data.to_dict()
placement_data.validate_against_app_info(app_info)
```

Так можно вручную проверить данные открытия приложения или виджета, обработчика события и робота бизнес-процесса, если приложение не использует Django, FastAPI или Flask.

## Объектный слой {#objects}

`b24pysdk.objects` — это высокоуровневый типизированный слой над поддерживаемыми REST-сущностями Битрикс24.

Он не заменяет обычные вызовы через `Client`. Обертки скоупов остаются основным прямым интерфейсом REST API, а объектный слой добавляет ORM-подобную работу с сущностями:

- Python-объекты с типизированными полями;
- ленивую загрузку;
- локальные изменения и `save()`;
- типизированные менеджеры объектов;
- фильтрацию, сортировку, выбор полей и пагинацию;
- связи через `ObjectField`;
- массовую предварительную загрузку связей через `select_related()`;
- метаданные полей и отображаемые значения списочных полей;
- batch-операции создания, обновления и удаления;
- `BitrixObjectList`;
- пользовательские подклассы объектов и менеджеры с сохранением типизации.

Конкретный менеджер предоставляет только те операции, которые корректно поддерживает REST API соответствующей сущности.

### Поддерживаемые семейства объектов

В объектном слое есть модели для:

- пользователей и пользовательских полей пользователей;
- подразделений;
- рабочих групп;
- групп/проектов социальной сети;
- событий и офлайн-событий;
- встраиваний;
- универсальных списков;
- списков бизнес-процессов;
- списков рабочих групп.

Примеры импортов:

```python
from b24pysdk.objects.user import User
from b24pysdk.objects.department import Department
from b24pysdk.objects.list.element import ListElement
```

### Подключение клиента

Клиент можно передавать явно:

```python
user = User(1, client=client)

users = User.objects.using(client=client).filter(active=True)
```

Для приложения, которое работает с одним порталом, можно настроить фабрику клиента по умолчанию:

```python
from b24pysdk import Config

Config().configure(
    default_client_factory=lambda: client,
)
```

После этого:

```python
user = User(1)
users = User.objects.filter(active=True)
```

Для приложения, которое работает с несколькими порталами, рекомендуется передавать правильный `client` или `client_factory` явно.

### Регистрация классов объектов

Классы объектов регистрируются при выполнении определения Python-класса, то есть после импорта модуля, в котором класс определен.

Поэтому объектный модуль должен быть импортирован хотя бы один раз до первого динамического использования класса.

Это особенно важно для пользовательских переопределений:

```python
import myapp.bitrix_objects
```

Такой импорт лучше выполнять при старте приложения до первых запросов объектного слоя, адаптации `.value` / `.values` или разрешения связей.

### Ленивая загрузка одного объекта

Создание объекта по первичному ключу само по себе не делает REST-запрос:

```python
user = User(1, client=client)
```

Запрос выполняется при первом чтении поля, которое еще не загружено:

```python
print(user.name)
```

Первичный ключ доступен без загрузки:

```python
print(user.bitrix_pk)
print(user.bitrix_id)
```

Объект можно создать и из уже имеющихся Bitrix24-данных:

```python
user = User(
    bitrix_data={
        "ID": "1",
        "NAME": "John",
        "ACTIVE": "Y",
    },
    client=client,
)
```

Если `bitrix_data` передается приложением напрямую в конструктор, SDK делает `deepcopy`, чтобы последующее изменение исходного словаря не меняло состояние объекта.

Внутренние адаптеры SDK работают иначе: свежий исходный REST-результат может быть передан объекту без дополнительного `deepcopy`. Поэтому `.result` и объект из `.value` / `.values` могут разделять ссылки на вложенные изменяемые значения. Исходный `.result` после адаптации лучше считать доступным только для чтения.

При этом:

```python
obj.bitrix_data
obj.local_data
```

возвращают отделенные снимки данных.

### Поля объекта

Атрибуты объекта представлены типизированными дескрипторами.

Например:

- `IntField`;
- `FloatField`;
- `TextField`;
- `HTMLField`;
- `BoolField`;
- `DateField`;
- `DateTimeField`;
- `TimeField`;
- `ListField`;
- `EnumField`;
- `DictField`;
- `FileField`;
- `ObjectField`;
- другие специализированные поля.

Присваивание поля изменяет локальное состояние объекта и само по себе не выполняет REST-запрос:

```python
user.name = "John"

print(user.has_changes)
print(user.local_data)
```

### `update()` и `save()`

`update()` отправляет изменения сразу:

```python
user.update(
    name="John",
    last_name="Smith",
)
```

Через дескрипторы можно накопить локальные изменения и затем вызвать:

```python
user.name = "John"
user.last_name = "Smith"

user.save()
```

По умолчанию `save()` отправляет только поля, которые зарегистрированы как измененные.

```python
user.name = "John"
user.save()
```

Если нужно явно отправить текущие значения определенных полей, используйте `update_fields`:

```python
user.save(
    update_fields=[
        "name",
        "last_name",
    ],
)
```

Поля из `update_fields` не обязаны быть записаны через setter перед `save()`.

Это полезно для изменяемых значений полей, которые поменялись внутри объекта.

Например:

```python
settings = userfield.settings
settings["DEFAULT_VALUE"] = "new value"

print(userfield.has_changes)  # False

userfield.save(
    update_fields=["settings"],
)
```

### Доступ к полю через `.field(attr_name)`

Кроме обычного:

```python
item.status
```

можно получить связанный объект доступа к полю:

```python
status = item.field("status")
```

`field()` принимает имя Python-атрибута, а не исходный код поля Битрикс24.

Объект доступа к полю предоставляет:

```python
status.value
status.raw_value
status.meta
status.title
```

Для `ListField` доступны также:

```python
status.items
status.display_value
```

Пример:

```python
for choice in item.field("status").items:
    print(choice.bitrix_id, choice.value)

print(item.field("status").display_value)
```

`display_value` преобразует сохраненный ID значения списка в отображаемое значение.

Можно выполнить обратное преобразование:

```python
item.field("status").display_value = "In progress"
item.save()
```

SDK найдет ID соответствующего значения списка и установит его как обычное значение поля.

Для множественного `ListField` можно передавать список отображаемых значений.

### Кеширование метаданных полей

Метаданные полей не запрашиваются отдельно для каждого экземпляра объекта.

Кеш хранится на `Client`.

Для кеша метаданных объектного слоя идентификатор учитывает семейство объектов и дискриминатор.

Для элементов конкретного универсального списка метаданные полей относятся к:

```text
"list.field" + (IBLOCK_TYPE_ID, IBLOCK_ID)
```

Например:

```python
projects = (
    ProjectElement.objects
    .using(client=client)
    .all()
)

for project in projects:
    print(project.field("status").display_value)
```

При первом доступе, которому нужны метаданные, SDK загружает определения полей списка.

Последующие `ProjectElement` с тем же `client` и тем же `IBLOCK_ID` используют уже загруженную коллекцию метаданных.

То есть итерационный доступ к `.meta`, `.title`, `.items` и `.display_value` не создает отдельный `lists.field.get` для каждого элемента.

Для другого списка или другого `Client` используется отдельный кеш метаданных.

### Менеджеры объектов

Менеджер объектов — типизированный построитель запросов на уровне класса.

Для запроса с фильтром:

```python
users = (
    User.objects
    .using(client=client)
    .filter(active=True)
)
```

Для запроса без фильтра:

```python
users = (
    User.objects
    .using(client=client)
    .all()
)
```

После этого менеджер можно лениво итерировать:

```python
for user in users:
    print(user.name)
```

Сам по себе менеджер является построителем запроса.

Цепочку только из модификаторов, например:

```python
User.objects.select("name").order("name")
```

следует завершать `.all()` перед итерацией:

```python
users = (
    User.objects
    .using(client=client)
    .select("name")
    .order("name")
    .all()
)
```

Если уже использован `filter()`, завершающий `.all()` не требуется.

### Основные операции менеджера

В зависимости от конкретной сущности менеджер может поддерживать:

```python
.using(...)
.filter(...)
.all()
.from_pks(...)
.order(...)
.reverse()
.select(...)
.select_all()
.select_related(...)
.start(...)
.limit(...)
.as_fast(...)
.to_list()
.count()
.exists()
.first()
.last()
.add(...)
.add_many(...)
.update(...)
.delete(...)
```

Некоторые менеджеры предоставляют операции, специфичные для конкретной сущности.

Например:

```python
User.objects.current()
User.objects.search(...)
```

### Фильтрация

Фильтры используют имена Python-полей:

```python
users = User.objects.filter(
    active=True,
    name__contains="John",
)
```

Поддерживаются lookup-суффиксы, если их поддерживают дескриптор поля и соответствующий метод API:

```text
__ne
__gt
__gte
__lt
__lte
__in
__not_in
__contains
__like
__not_contains
__not_like
```

Можно фильтровать по синтетическому полю первичного ключа:

```python
User.objects.filter(bitrix_pk=1)

User.objects.filter(
    bitrix_pk__in=[1, 2, 3],
)
```

Массовый запрос по первичным ключам:

```python
users = User.objects.from_pks([1, 2, 3])
```

### `select()`

Если метод API поддерживает выбор полей:

```python
users = (
    User.objects
    .select(
        "bitrix_id",
        "name",
        "email",
    )
    .all()
)
```

Менеджер использует имена Python-полей.

Обязательные поля первичного ключа добавляются автоматически.

Можно выбрать все зарегистрированные поля:

```python
users = User.objects.select_all().all()
```

Частично загруженный объект остается безопасным: если позже обратиться к зарегистрированному полю, которое не было загружено, объектный слой может выполнить полную ленивую перезагрузку.

### `count()`, `exists()`, `first()`, `last()`

```python
query = User.objects.filter(active=True)

count = query.count()
exists = query.exists()
first = query.first()
last = query.last()
```

`count()` учитывает `limit`, но не использует `start`.

Для уже материализованного `BitrixObjectList` длина берется из памяти.

### Быстрая загрузка

```python
users = (
    User.objects
    .filter(active=True)
    .as_fast()
)

for user in users:
    ...
```

Fast-менеджер может использовать генератор с одним проходом.

Если результат нужен повторно:

```python
users = users.to_list()
```

`start()` в fast-режиме не используется.

Явная сортировка для fast-режима должна соответствовать полному первичному ключу и иметь единое направление.

### Связи и `ObjectField`

`ObjectField` представляет связь как другой SDK-объект.

Например у `Department` есть:

```python
department.uf_head_id
department.uf_head
```

Обычный `ObjectField` загружается лениво.

После загрузки подразделения:

```python
department.uf_head
```

создает легкий связанный объект `User` по первичному ключу без отдельного запроса.

Запрос может произойти позже:

```python
department.uf_head.name
```

если связанный объект еще не загружен.

### `select_related()` и устранение N+1

Если связь читается для большого количества родительских объектов, обычный ленивый доступ может привести к N+1 запросам.

Для массовой предварительной загрузки используйте `select_related()`:

```python
departments = (
    Department.objects
    .using(client=client)
    .select_related(
        "parent",
        "uf_head.name",
        "uf_head.email",
    )
    .all()
)
```

#### Пути связей

Путь должен начинаться с `ObjectField`.

Можно загрузить связанный объект целиком:

```python
select_related("uf_head")
```

или конкретные поля связанного объекта:

```python
select_related(
    "uf_head.name",
    "uf_head.email",
)
```

Можно использовать вложенные связи:

```python
select_related(
    "parent.uf_head.name",
)
```

Все промежуточные части пути должны быть `ObjectField`.

#### Как выполняется `select_related()`

При выполнении запроса менеджер:

1. загружает родительские объекты;
2. убеждается, что в ответе родительского объекта есть исходное поле связи, например ID связанного объекта;
3. если используется явный `select()`, автоматически добавляет необходимое исходное поле связи;
4. собирает первичные ключи связанных объектов со всех родительских объектов;
5. удаляет повторяющиеся PK;
6. создает один массовый запрос связанного менеджера через `from_pks(unique_pks)`;
7. передает в связанный менеджер тот же `Client`;
8. при необходимости передает таймаут;
9. если путь содержит конечные поля, объединяет их в один `select()` для связанного запроса;
10. рекурсивно обрабатывает вложенные `select_related`;
11. индексирует загруженные связанные объекты по первичному ключу;
12. заменяет легкие заготовки связей на уже загруженные объекты.

Поэтому:

```python
Department.objects.select_related("uf_head").all()
```

логически выполняет:

```text
1 запрос родительских объектов
+ 1 массовый запрос связанных объектов
```

вместо:

```text
1 запрос родительских объектов
+ N запросов пользователей
```

Для:

```python
.select_related(
    "uf_head.name",
    "uf_head.email",
    "uf_head.work_position",
)
```

`uf_head` загружается один раз с объединенным набором конечных полей.

Для двух разных связей:

```python
.select_related(
    "parent",
    "uf_head",
)
```

на текущем уровне выполняется отдельный массовый запрос для каждой связи.

#### Множественные связи

Для множественного `ObjectField` SDK:

- собирает уникальные ID из всех родительских объектов;
- массово загружает каждый связанный первичный ключ;
- сохраняет исходный порядок списка связей каждого родительского объекта;
- возвращает типизированный `BitrixObjectList`.

#### Отсутствующие связанные записи

Если исходный первичный ключ есть у родительского объекта, но массовый запрос связанных объектов не вернул объект, `select_related()` не завершается ошибкой сразу.

В кеше связи остается исходная заготовка с первичным ключом.

При дальнейшем ленивом доступе к незагруженному полю такой заготовки действует обычная логика связанного объекта и возможен его `DoesNotExist`.

#### `select()` и `select_related()`

Это разные операции:

- `select()` определяет обычные поля текущего объекта;
- `select_related()` определяет связи, которые нужно массово загрузить.

Их можно комбинировать:

```python
departments = (
    Department.objects
    .select(
        "bitrix_id",
        "name",
    )
    .select_related(
        "uf_head.name",
        "uf_head.email",
    )
    .all()
)
```

Даже если исходное поле внешнего ключа связи не указано в `.select()`, SDK добавляет его автоматически, если оно нужно для `select_related()`.

#### Конечная связь и конечные поля

Разница:

```python
select_related("uf_head")
```

загружает обычный набор данных связанного объекта.

А:

```python
select_related(
    "uf_head.name",
    "uf_head.email",
)
```

передает связанному менеджеру явный выбор этих полей.

Если для конечных полей требуется `select()`, связанный менеджер должен поддерживать публичный `select()`.

#### Требования

Для массовой загрузки связей связанный менеджер должен поддерживать `from_pks()`.

Если корректный массовый `from_pks()` невозможен, `select_related()` выбрасывает ошибку объектного слоя вместо скрытого перехода к N+1 запросам.

Связь при этом по-прежнему можно использовать обычным ленивым способом.

#### `select_related()` и fast-режим

Fast-запрос может быть генератором с одним проходом.

Для `select_related()` результат с родительскими объектами нужно обойти несколько раз, поэтому fast-поток родительских объектов при необходимости материализуется в `BitrixObjectList`.

Связанные записи при этом могут загружаться быстрым массовым запросом через `from_pks(...).as_fast()`.

### `BitrixObjectList`

Материализация запроса:

```python
users = (
    User.objects
    .filter(active=True)
    .to_list()
)
```

Результат — типизированный `BitrixObjectList[User]`.

Доступны:

```python
users.length
users.exists()
users.first()
users.last()
users.to_pks()
```

Можно сохранить локальные изменения объектов batch-операцией:

```python
for user in users:
    user.title = "Developer"

result = users.update()
```

Объекты без локальных изменений пропускаются.

Можно удалить все объекты списка, если метод API поддерживает удаление:

```python
result = users.delete()
```

### Batch-создание

Менеджеры, которые поддерживают создание, предоставляют `add()`:

```python
department = Department.objects.add(
    name="Development",
    sort=100,
)
```

Массовое добавление:

```python
result = Department.objects.add_many([
    {
        "name": "Backend",
        "sort": 100,
    },
    {
        "name": "Frontend",
        "sort": 200,
    },
])
```

`BitrixObjectBatchAddResult[T]` предоставляет:

```python
result.results
result.errors
result.is_success
result.has_errors
```

`result.results` — типизированный `BitrixObjectList[T]`.

Если на вход передана последовательность, ошибки привязаны к исходному индексу, начиная с нуля.

Если на вход передан словарь, `errors` сохраняет пользовательские ключи.

### Batch-обновление и удаление

Запрос менеджера:

```python
result = (
    Department.objects
    .filter(name__contains="Old")
    .update(name="Renamed")
)
```

или:

```python
result = (
    Department.objects
    .filter(bitrix_pk__in=[10, 11, 12])
    .delete()
)
```

Возвращается `BitrixObjectBatchWriteResult[T]`:

```python
result.result
result.result_error

result.results
result.errors

result.is_success
result.has_errors
```

`result.result` и `result.result_error` привязаны к самим экземплярам SDK-объектов.

`result.results` и `result.errors` — типизированный `BitrixObjectList[T]`.

### Пользовательские подклассы объектов

SDK-объекты можно расширять под конкретный портал:

- добавлять пользовательские поля;
- добавлять методы объекта;
- фиксировать контекст конкретной сущности;
- переопределять менеджер при необходимости.

#### Пример: конкретный универсальный список

Пусть на портале создан универсальный список:

```text
IBLOCK_ID = 123
```

и у него есть свойства:

```text
PROPERTY_101  Customer
PROPERTY_102  Status
PROPERTY_103  Budget
PROPERTY_104  Attachment
```

Можно создать прикладной объект:

```python
from b24pysdk.objects import (
    FileField,
    FloatField,
    ListField,
    TextField,
)
from b24pysdk.objects.list.element import ListElement
from b24pysdk.schemas.list.field import ListElementFile


class ProjectElement(ListElement):
    IBLOCK_ID = 123

    customer = TextField("PROPERTY_101")
    status = ListField("PROPERTY_102")
    budget = FloatField("PROPERTY_103")
    attachment = FileField[ListElementFile](
        "PROPERTY_104",
        file_class=ListElementFile,
    )

    def customer_label(self) -> str:
        return f"{self.name}: {self.customer or '-'}"
```

Отдельный менеджер для этого не обязателен.

Унаследованный менеджер автоматически привязывается к конкретному подклассу:

```python
project = (
    ProjectElement.objects
    .filter(status=7)
    .first()
)

# type: ProjectElement | None
```

Материализованный результат:

```python
projects = (
    ProjectElement.objects
    .filter(status=7)
    .to_list()
)

# type: BitrixObjectList[ProjectElement]
```

Создание:

```python
project = ProjectElement.objects.add(
    element_code="PROJECT-001",
    name="New project",
    customer="Acme",
    status=7,
    budget=150000.0,
)

# type: ProjectElement
```

### Пользовательский менеджер с сохранением типизации

Если нужны методы менеджера под конкретное приложение, менеджер можно сразу специализировать под конкретный тип объекта.

Дополнительный `Generic` / `TypeVar` для обычного случая не нужен:

```python
from b24pysdk.objects.list.element import (
    ListElement,
    ListElementManager,
)


class ProjectElementManager(
    ListElementManager["ProjectElement"],
):
    def with_status(
        self,
        status_id: int,
    ) -> "ProjectElementManager":
        return self.filter(status=status_id)

    def create_project(
        self,
        *,
        code: str,
        name: str,
        customer: str,
        status_id: int,
        budget: float,
    ) -> "ProjectElement":
        return self.add(
            element_code=code,
            name=name,
            customer=customer,
            status=status_id,
            budget=budget,
        )


class ProjectElement(ListElement):
    IBLOCK_ID = 123

    objects: "ProjectElementManager" = ProjectElementManager()

    customer = TextField("PROPERTY_101")
    status = ListField("PROPERTY_102")
    budget = FloatField("PROPERTY_103")
```

Типизация сохраняется:

```python
query = (
    ProjectElement.objects
    .with_status(7)
    .limit(20)
)

# type: ProjectElementManager

project = query.first()
# type: ProjectElement | None

projects = query.to_list()
# type: BitrixObjectList[ProjectElement]
```

Пользовательский метод создания:

```python
project = ProjectElement.objects.create_project(
    code="PROJECT-002",
    name="Typed project",
    customer="Acme",
    status_id=7,
    budget=250000.0,
)

# type: ProjectElement
```

`add_many()` также сохраняет обобщенный тип объекта:

```python
result = ProjectElement.objects.add_many([
    {
        "element_code": "PROJECT-003",
        "name": "Another project",
        "customer": "Acme",
        "status": 7,
        "budget": 100000.0,
    },
])

# type: BitrixObjectBatchAddResult[ProjectElement]
```

Дополнительный обобщенный менеджер нужен только если приложение действительно планирует дальнейшее наследование `ProjectElement` и хочет сохранить этот подтип через тот же пользовательский менеджер.

### Регистрация и дискриминатор универсальных списков

Для `ListElement` семейство объектов использует дискриминатор:

```text
(IBLOCK_TYPE_ID, IBLOCK_ID)
```

У обобщенного класса универсального списка тип списка уже фиксирован, а конкретный `IBLOCK_ID` может быть `None`.

В прикладном подклассе:

```python
class ProjectElement(ListElement):
    IBLOCK_ID = 123
```

регистрируется конкретная реализация только для этого списка.

Порядок поиска подходящей модели:

```text
(lists, 123)
(lists, None)
(None, None)
None
```

Поэтому пользовательский `ProjectElement` не заменяет модель всех остальных универсальных списков.

Если новый класс повторно регистрируется для той же точной пары `OBJECT_KEY + discriminator`, он должен наследовать класс, который уже зарегистрирован для этой пары.

Не забывайте импортировать модуль с пользовательскими объектами до первого использования.

### Важное правило при обновлении `PROPERTY_*`

Для элементов универсальных списков REST-обновление может очистить значения пользовательских свойств, которые отсутствуют в полном наборе отправляемых данных.

Поэтому если приложение обновляет конкретные элементы списков, объявите дескрипторы для всех текущих `PROPERTY_*`, которые возвращает портал.

Если API возвращает необъявленное свойство, объектный слой должен остановить обновление и потребовать описать поле, а не рисковать очисткой другого пользовательского свойства.

### Исключения объектного слоя

Основные исключения находятся в `b24pysdk.objects.errors`.

Например:

- `BitrixObjectError`;
- `BitrixObjectDoesNotExist`;
- `BitrixObjectMultipleObjectsReturned`;
- `BitrixObjectClientError`;
- `BitrixObjectFieldError`;
- `BitrixObjectFilterError`;
- `BitrixObjectFieldReadOnlyError`;
- `BitrixObjectFieldNotLoadedError`.

Конкретные классы объектов также предоставляют свои исключения:

```python
User.DoesNotExist
User.MultipleObjectsReturned
```


## Интеграция с Django {#django}

Интеграция Django предоставляет декораторы для view-функций. Они собирают параметры запроса, проверяют входящие данные и добавляют к `request` типизированные данные Битрикс24.

Открытие приложения или виджета:

```python
from django.http import JsonResponse

from b24pysdk.integrations.django.decorators import placement_required
from b24pysdk.integrations.django.types import PlacementRequest


@placement_required
def placement_view(request: PlacementRequest):
    return JsonResponse({
        "domain": request.oauth_placement_data.domain,
    })
```

Обработчик события:

```python
from django.http import JsonResponse

from b24pysdk.integrations.django.decorators import event_required
from b24pysdk.integrations.django.types import EventRequest


@event_required
def event_view(request: EventRequest):
    return JsonResponse({
        "event": request.oauth_event_data.event,
    })
```

Робот бизнес-процесса:

```python
from django.http import JsonResponse

from b24pysdk.integrations.django.decorators import workflow_required
from b24pysdk.integrations.django.types import WorkflowRequest


@workflow_required
def workflow_view(request: WorkflowRequest):
    return JsonResponse({
        "workflow_id": request.oauth_workflow_data.workflow_id,
    })
```

Проверка входящих данных через `app.info`:

```python
from django.http import JsonResponse

from b24pysdk import BitrixApp
from b24pysdk.integrations.django.decorators import event_required
from b24pysdk.integrations.django.types import EventRequest

bitrix_app = BitrixApp(
    client_id="put-your-client-id-here",
    client_secret="put-your-client-secret-here",
)


@event_required(bitrix_app=bitrix_app)
def event_view(request: EventRequest):
    return JsonResponse({
        "event": request.oauth_event_data.event,
    })
```

Ошибки валидации интеграция возвращает как `401 Unauthorized`, а непредвиденные ошибки - как `500 Internal Server Error`.

## Интеграция с FastAPI {#fastapi}

Интеграция FastAPI использует зависимости. Они возвращают типизированные `OAuthPlacementData`, `OAuthEventData` или `OAuthWorkflowData`.

Открытие приложения или виджета:

```python
from typing import Annotated

from fastapi import Depends, FastAPI

from b24pysdk.credentials import OAuthPlacementData
from b24pysdk.integrations.fastapi.dependencies import placement_dependency

app = FastAPI()


@app.post("/placement")
async def placement_handler(
    placement: Annotated[OAuthPlacementData, Depends(placement_dependency)],
):
    return {
        "domain": placement.domain,
    }
```

Обработчик события:

```python
from typing import Annotated

from fastapi import Depends, FastAPI

from b24pysdk.credentials import OAuthEventData
from b24pysdk.integrations.fastapi.dependencies import event_dependency

app = FastAPI()


@app.post("/event")
async def event_handler(
    event: Annotated[OAuthEventData, Depends(event_dependency)],
):
    return {
        "event": event.event,
    }
```

Робот бизнес-процесса:

```python
from typing import Annotated

from fastapi import Depends, FastAPI

from b24pysdk.credentials import OAuthWorkflowData
from b24pysdk.integrations.fastapi.dependencies import workflow_dependency

app = FastAPI()


@app.post("/workflow")
async def workflow_handler(
    workflow: Annotated[OAuthWorkflowData, Depends(workflow_dependency)],
):
    return {
        "workflow_id": workflow.workflow_id,
    }
```

Проверка входящих данных через `app.info`:

Если нужно передать `bitrix_app`, используйте `get_*_dependency(...)` с нужным аргументом:

```python
from typing import Annotated

from fastapi import Depends, FastAPI

from b24pysdk import BitrixApp
from b24pysdk.credentials import OAuthEventData
from b24pysdk.integrations.fastapi.dependencies import get_event_dependency

app = FastAPI()

bitrix_app = BitrixApp(
    client_id="put-your-client-id-here",
    client_secret="put-your-client-secret-here",
)


@app.post("/event")
async def event_handler(
    event: Annotated[
        OAuthEventData,
        Depends(get_event_dependency(bitrix_app=bitrix_app)),
    ],
):
    return {
        "event": event.event,
    }
```

Ошибки валидации интеграция возвращает как `401 Unauthorized`, а непредвиденные ошибки - как `500 Internal Server Error`.

## Интеграция с Flask {#flask}

Интеграция Flask предоставляет декораторы для маршрутов и helper-функции для типизированного доступа к данным. Данные сохраняются в `flask.g`.

Открытие приложения или виджета:

```python
from flask import Flask

from b24pysdk.integrations.flask.decorators import placement_required
from b24pysdk.integrations.flask.dependencies import get_oauth_placement_data

app = Flask(__name__)


@app.post("/placement")
@placement_required
def placement_handler():
    return {
        "domain": get_oauth_placement_data().domain,
    }
```

Обработчик события:

```python
from flask import Flask

from b24pysdk.integrations.flask.decorators import event_required
from b24pysdk.integrations.flask.dependencies import get_oauth_event_data

app = Flask(__name__)


@app.post("/event")
@event_required
def event_handler():
    return {
        "event": get_oauth_event_data().event,
    }
```

Робот бизнес-процесса:

```python
from flask import Flask

from b24pysdk.integrations.flask.decorators import workflow_required
from b24pysdk.integrations.flask.dependencies import get_oauth_workflow_data

app = Flask(__name__)


@app.post("/workflow")
@workflow_required
def workflow_handler():
    return {
        "workflow_id": get_oauth_workflow_data().workflow_id,
    }
```

Проверка входящих данных через `app.info`:

```python
from flask import Flask

from b24pysdk import BitrixApp
from b24pysdk.integrations.flask.decorators import event_required
from b24pysdk.integrations.flask.dependencies import get_oauth_event_data

app = Flask(__name__)

bitrix_app = BitrixApp(
    client_id="put-your-client-id-here",
    client_secret="put-your-client-secret-here",
)


@app.post("/event")
@event_required(bitrix_app=bitrix_app)
def event_handler():
    return {
        "event": get_oauth_event_data().event,
    }
```

Ошибки валидации интеграция возвращает как `401 Unauthorized`, а непредвиденные ошибки - как `500 Internal Server Error`.

## События токена {#token-events}

SDK может автоматически обновить OAuth-токен или сменить домен портала, если Битрикс24 вернул редирект на новый домен. На эти действия можно подписаться.

Для подписки на сигналы установите SDK с дополнительным набором зависимостей `signals`:

```bash
pip install "b24pysdk[signals]"
```

Без этого набора обычные REST-вызовы и автоматическое обновление OAuth-токена работают, но прямой импорт `b24pysdk.signals` завершится `ImportError` с подсказкой по установке.

```python
from b24pysdk.events import OAuthTokenRenewedEvent, PortalDomainChangedEvent


def on_token_renewed(event: OAuthTokenRenewedEvent):
    print(event.renewed_oauth_token.oauth_token.access_token)


def on_domain_changed(event: PortalDomainChangedEvent):
    print(event.old_domain, event.new_domain)


bitrix_token.oauth_token_renewed_signal.connect(on_token_renewed)
bitrix_token.portal_domain_changed_signal.connect(on_domain_changed)
```

Это нужно, если приложение хранит OAuth-токены в базе данных или конфигурации и должно обновлять сохраненное значение после автоматического refresh.

## Настройка таймаутов, повторов и логирования {#config}

`Config` задает настройки SDK для текущего потока выполнения: таймауты, количество повторов, задержки между повторами, логирование и часовой пояс.

```python
from b24pysdk import Config
from b24pysdk.log import StreamLogger

logger = StreamLogger()

Config().configure(
    default_connect_timeout=3.05,
    default_read_timeout=10,
    default_max_retries=3,
    default_initial_retry_delay=1,
    default_retry_delay_increment=1,
    logger=logger,
    secure_log=True,
)
```

Текущие значения по умолчанию:

- таймаут подключения - `3.05` секунды;
- таймаут чтения ответа - `10` секунд;
- максимальное количество попыток - `3`;
- начальная задержка перед повтором - `1` секунда;
- увеличение задержки при каждом повторе - `1` секунда.

Параметр `secure_log` по умолчанию включен. В этом режиме SDK маскирует OAuth-токены, client secret, auth-параметры и учетные данные из webhook URL в логах. Отключайте его только в контролируемой среде, где логи не попадут в общий доступ.

Повтор запроса выполняется для HTTP 503. Задержка между попытками увеличивается: первая пауза задается `default_initial_retry_delay`, затем к ней добавляется `default_retry_delay_increment`.

Таймаут можно задать и для конкретного клиента или отдельного вызова:

```python
client = Client(
    bitrix_token,
    timeout=(3.05, 10),
    max_retries=3,
    initial_retry_delay=1,
    retry_delay_increment=1,
)

result = client.crm.deal.get(
    bitrix_id=1,
    timeout=5,
).result
```

## Константы {#constants}

В `b24pysdk.constants` есть константы для часто используемых значений API. Они полезны, когда не хочется передавать числовые идентификаторы или строковые коды вручную:

```python
from b24pysdk.constants.crm import EntityTypeID

fields = client.crm.item.fields(
    entity_type_id=EntityTypeID.DEAL,
    use_original_uf_names="N",
).result
```

Константы не обязательны, но делают код понятнее и уменьшают риск опечаток в значениях, которые часто повторяются.
