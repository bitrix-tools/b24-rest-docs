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
4. Пагинацию списочных методов через `.as_list()` и `.as_list_fast()`;
5. Batch-запросы и единую обработку ошибок REST API.

## Основные модули SDK

B24PySDK состоит из нескольких групп модулей, которые закрывают разные части работы с REST API:

- `b24pysdk.Client` - точка входа для вызова методов REST API. Через клиент доступны скоупы `crm`, `user`, `department`, `disk`, `bizproc`, `tasks` и другие.
- `b24pysdk.credentials` - классы авторизации: `BitrixWebhook`, `BitrixToken`, `BitrixTokenLocal`, `BitrixApp`, `BitrixAppLocal`, а также модели OAuth-данных, которые приходят от Битрикс24.
- `b24pysdk.api.requests` - объекты запросов, которые возвращают обертки методов: стандартные запросы, списочные запросы и batch-запросы.
- `b24pysdk.api.responses` - объекты ответов, которые дают доступ к `result`, `time`, `total`, `next` и другим данным ответа.
- `b24pysdk.errors` - единая иерархия исключений для ошибок сети, HTTP-ответов, JSON, REST API, OAuth и валидации параметров.
- `b24pysdk.integrations` - интеграции для Django, FastAPI и Flask: декораторы, зависимости и вспомогательные функции для обработки входящих запросов от Битрикс24.
- `b24pysdk.constants` - константы для CRM, пользователей, задач, телефонии и других разделов API.
- `b24pysdk.events` и `b24pysdk.signals` - события SDK, например обновление OAuth-токена или автоматическая смена домена портала после редиректа.
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

## Установка

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

Репозиторий SDK доступен на GitHub: [bitrix24/b24pysdk](https://github.com/bitrix24/b24pysdk).

## Использование со входящими вебхуками

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

## Получение bitrix_token в маркетных приложениях

Для маркетного приложения, которое открывается внутри интерфейса Битрикс24, используйте `BitrixApp` и OAuth-данные входящего запроса. Домен портала SDK возьмет из этих данных.

В примере ниже `params` — это нормализованные параметры входящего POST-запроса от Битрикс24. В Django-интеграции SDK они доступны как `request.params`; в других фреймворках это такой же словарь, собранный из входящего request. В этих параметрах приходят `DOMAIN`, `PROTOCOL`, `LANG`, `APP_SID`, `AUTH_ID`, `AUTH_EXPIRES`, `REFRESH_ID`, `member_id`, `status`. Для виджетов дополнительно могут прийти `PLACEMENT` и `PLACEMENT_OPTIONS`.

```python
from b24pysdk import BitrixApp, BitrixToken, Client
from b24pysdk.credentials import OAuthPlacementData

bitrix_app = BitrixApp(
    client_id="put-your-client-id-here",
    client_secret="put-your-client-secret-here",
)

placement_data = OAuthPlacementData.from_dict(params)
bitrix_token = BitrixToken.from_oauth_placement_data(
    oauth_placement_data=placement_data,
    bitrix_app=bitrix_app,
)

client = Client(bitrix_token)
```

Значения `client_id` и `client_secret` берутся из настроек приложения. `OAuthPlacementData.from_dict()` валидирует входящие параметры, извлекает домен портала и преобразует поля `AUTH_ID`, `REFRESH_ID`, `AUTH_EXPIRES` в OAuth-токен SDK.

## Получение bitrix_token в локальных приложениях

Для локального приложения используйте `BitrixAppLocal` и `BitrixTokenLocal`. В отличие от маркетного приложения, `BitrixAppLocal` привязан к конкретному порталу. Переменная `params` — это тот же словарь входящих параметров от Битрикс24:

```python
from b24pysdk import BitrixAppLocal, BitrixTokenLocal, Client
from b24pysdk.credentials import OAuthPlacementData

placement_data = OAuthPlacementData.from_dict(params)

bitrix_app = BitrixAppLocal(
    domain=placement_data.domain,
    client_id="put-your-client-id-here",
    client_secret="put-your-client-secret-here",
)

bitrix_token = BitrixTokenLocal.from_oauth_placement_data(
    oauth_placement_data=placement_data,
    bitrix_app=bitrix_app,
)

client = Client(bitrix_token)
```

В случае локального приложения, вам нужно будет взять значения `client_id`, `client_secret` и список прав из соответствующих настроек локального приложения в вашем Битрикс24. Значения `AUTH_ID` и `REFRESH_ID` приходят во входящих OAuth-данных при открытии приложения, вызове обработчиков событий и работе с бизнес-процессами.

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

## Версии REST API

`Client` может работать с разными версиями REST API. Если версия не указана, SDK использует версию по умолчанию. Если нужно явно предпочесть API v3, передайте `prefer_version=3`:

```python
client = Client(bitrix_token, prefer_version=3)
```

При выборе API v3 SDK использует v3-обертку, если она есть. Если метод пока не имеет отдельной v3-обертки, SDK может использовать доступную обертку предыдущей версии.

## Ответы и запросы

Методы SDK не отправляют запрос в момент создания объекта. Они возвращают объект запроса. Вызов выполняется, когда вы обращаетесь к `.response`, `.result` или `.time`.

```python
request = client.crm.deal.get(bitrix_id=1)

deal = request.result
duration = request.time.duration
```

`request.response` содержит объект ответа целиком:

- `response.result` - данные, которые вернул REST-метод;
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

## Параметры методов и проверка типов

В обертках SDK параметры названы как Python-аргументы. Например, REST-параметр `ID` в методах получения сущностей обычно передается как `bitrix_id`, а объект `fields` остается словарем:

```python
result = client.crm.deal.update(
    bitrix_id=1,
    fields={
        "TITLE": "Новое название сделки",
    },
).result
```

SDK проверяет типы аргументов перед отправкой запроса. Это помогает поймать ошибку на стороне приложения, а не после ответа REST API:

```python
from b24pysdk.errors import BitrixValidationError

try:
    client.crm.deal.get(bitrix_id="1").result
except BitrixValidationError as error:
    print(f"Некорректные параметры SDK: {error.message}")
```

## Списочные методы и большие выборки

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
    filter={">ID": 0},
    order={"ID": "ASC"},
).as_list_fast().result

for deal in deals:
    print(deal["ID"], deal["TITLE"])
```

`.as_list_fast()` возвращает генератор и делает запросы лениво во время обхода. Это удобно для больших объемов данных, когда не нужно держать всю выборку в памяти.

## Batch-запросы

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

## Обработка ошибок

Все исключения SDK наследуются от `BitrixSDKException`. На практике удобно разделять ошибки на несколько уровней:

- `BitrixValidationError` - SDK нашел некорректные параметры до отправки запроса;
- `BitrixRequestError` и `BitrixRequestTimeout` - проблема сети или таймаут;
- `BitrixResponseError` - сервер вернул HTTP-ответ, который не удалось обработать как корректный JSON-ответ REST API;
- `BitrixAPIError` - REST API вернул ошибку в стандартном формате `error` и `error_description`;
- `BitrixAPIExpiredToken` - OAuth-токен истек; для `BitrixToken` SDK может обновить его автоматически, если есть `refresh_token` и данные приложения;
- `BitrixAPIInsufficientScope` - приложению не хватает прав;
- `BitrixAPITooManyRequests`, `BitrixAPIQueryLimitExceeded`, `BitrixAPIOverloadLimit` - превышены лимиты или портал временно перегружен.

Пример общей обработки ошибок:

```python
from b24pysdk.errors import (
    BitrixAPIError,
    BitrixAPIInsufficientScope,
    BitrixAPIQueryLimitExceeded,
    BitrixAPITooManyRequests,
    BitrixRequestTimeout,
    BitrixSDKException,
    BitrixValidationError,
)

try:
    deal = client.crm.deal.get(bitrix_id=1).result
except BitrixValidationError as error:
    print(f"Ошибка параметров SDK: {error.message}")
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

## Валидация входящих данных от Битрикс24

Битрикс24 передает данные в приложение при открытии приложения внутри интерфейса, открытии виджета, вызове обработчиков событий и работе бизнес-процессов. SDK умеет разбирать эти данные в типизированные объекты:

- `OAuthPlacementData` - данные открытия приложения или виджета;
- `OAuthEventData` - данные обработчика события;
- `OAuthWorkflowData` - данные робота бизнес-процесса;
- `OAuth`, `EventOAuth`, `WorkflowOAuth`, `RenewedOAuth` - модели OAuth-данных внутри входящих payload.

Если вы не используете готовую интеграцию с веб-фреймворком, можно валидировать словарь из входящего запроса вручную:

```python
from b24pysdk.credentials import OAuthPlacementData

try:
    placement_data = OAuthPlacementData.from_dict(params)
except OAuthPlacementData.ValidationError as error:
    print(f"Некорректные данные открытия приложения: {error}")
else:
    print(placement_data.domain)
```

Для локального приложения можно создать токен прямо из валидированных OAuth-данных:

```python
from b24pysdk import BitrixAppLocal, BitrixTokenLocal, Client
from b24pysdk.credentials import OAuthPlacementData

placement_data = OAuthPlacementData.from_dict(params)

bitrix_app = BitrixAppLocal(
    domain=placement_data.domain,
    client_id="put-your-client-id-here",
    client_secret="put-your-client-secret-here",
)

bitrix_token = BitrixTokenLocal.from_oauth_placement_data(
    oauth_placement_data=placement_data,
    bitrix_app=bitrix_app,
)

client = Client(bitrix_token)
```

Если передать `bitrix_app` в интеграции Django, FastAPI или Flask, SDK сможет дополнительно проверить входящие OAuth-данные через `app.info`.

## Интеграция с Django

Интеграция Django предоставляет декораторы для view-функций. Они собирают параметры запроса, валидируют payload и добавляют к `request` типизированные данные Битрикс24.

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

Для событий и роботов бизнес-процессов используются `event_required` и `workflow_required`:

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

Если нужно проверять входящие данные через `app.info`, передайте приложение в декоратор:

```python
@placement_required(bitrix_app=bitrix_app)
def placement_view(request: PlacementRequest):
    return JsonResponse({
        "domain": request.oauth_placement_data.domain,
    })
```

Ошибки валидации интеграция возвращает как `401 Unauthorized`, а непредвиденные ошибки - как `500 Internal Server Error`.

## Интеграция с FastAPI

Интеграция FastAPI использует зависимости. Они возвращают типизированные `OAuthPlacementData`, `OAuthEventData` или `OAuthWorkflowData`.

```python
from typing import Annotated

from fastapi import Depends, FastAPI

from b24pysdk.credentials import OAuthPlacementData
from b24pysdk.integrations.fastapi.dependencies import get_placement_dependency

app = FastAPI()


@app.post("/placement")
async def placement_handler(
    placement: Annotated[OAuthPlacementData, Depends(get_placement_dependency())],
):
    return {
        "domain": placement.domain,
    }
```

Для событий и роботов используйте `get_event_dependency()` и `get_workflow_dependency()`:

```python
from typing import Annotated

from fastapi import Depends

from b24pysdk.credentials import OAuthEventData
from b24pysdk.integrations.fastapi.dependencies import get_event_dependency


@app.post("/event")
async def event_handler(
    event: Annotated[OAuthEventData, Depends(get_event_dependency())],
):
    return {
        "event": event.event,
    }
```

Проверка через `app.info` включается передачей `bitrix_app`:

```python
placement_dependency = get_placement_dependency(bitrix_app=bitrix_app)
```

## Интеграция с Flask

Интеграция Flask предоставляет декораторы для маршрутов и helper-функции для типизированного доступа к данным. Данные сохраняются в `flask.g`.

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

Для событий и роботов бизнес-процессов используются `event_required`, `workflow_required`, `get_oauth_event_data()` и `get_oauth_workflow_data()`:

```python
from b24pysdk.integrations.flask.decorators import event_required
from b24pysdk.integrations.flask.dependencies import get_oauth_event_data


@app.post("/event")
@event_required
def event_handler():
    return {
        "event": get_oauth_event_data().event,
    }
```

Как и в других интеграциях, `bitrix_app` включает дополнительную проверку входящих данных:

```python
@placement_required(bitrix_app=bitrix_app)
def placement_handler():
    return {
        "domain": get_oauth_placement_data().domain,
    }
```

## События токена

SDK может автоматически обновить OAuth-токен или сменить домен портала, если Битрикс24 вернул редирект на новый домен. На эти действия можно подписаться:

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

## Настройка таймаутов, повторов и логирования

`Config` задает настройки SDK для текущего потока выполнения: таймауты, количество повторов, задержки между повторами, логирование и часовой пояс.

```python
from b24pysdk import Config
from b24pysdk.log import StreamLogger

logger = StreamLogger()

Config().configure(
    default_timeout=(3.05, 10),
    default_max_retries=3,
    default_initial_retry_delay=1,
    default_retry_delay_increment=1,
    logger=logger,
)
```

Таймаут можно задать и для конкретного клиента или отдельного вызова:

```python
client = Client(bitrix_token, timeout=(3.05, 10))

result = client.crm.deal.get(
    bitrix_id=1,
    timeout=5,
).result
```

## Константы

В `b24pysdk.constants` есть константы для часто используемых значений API. Они полезны, когда не хочется передавать числовые идентификаторы или строковые коды вручную:

```python
from b24pysdk.constants.crm import EntityTypeID

fields = client.crm.item.fields(
    entity_type_id=EntityTypeID.DEAL,
    use_original_uf_names="N",
).result
```

Константы не обязательны, но делают код понятнее и уменьшают риск опечаток в значениях, которые часто повторяются.
