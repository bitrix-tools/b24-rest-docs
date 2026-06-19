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

## Получение bitrix_token в локальных приложениях

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

SDK проверяет типы аргументов перед отправкой запроса. Это помогает поймать ошибку на стороне приложения, а не после ответа REST API. Передавайте значения того типа, который указан в подсказках IDE и сигнатуре метода.

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

## Валидация входящих данных от Битрикс24

Битрикс24 передает данные в приложение при открытии приложения внутри интерфейса, открытии виджета, вызове обработчиков событий и работе бизнес-процессов. Готовые интеграции SDK собирают параметры входящего запроса, валидируют payload и возвращают типизированные данные:

- `OAuthPlacementData` - данные открытия приложения или виджета;
- `OAuthEventData` - данные обработчика события;
- `OAuthWorkflowData` - данные робота бизнес-процесса;
- `OAuth`, `EventOAuth`, `WorkflowOAuth`, `RenewedOAuth` - OAuth-данные внутри входящих payload.

Если передать `bitrix_app` в интеграции Django, FastAPI или Flask, SDK сможет дополнительно проверить входящие OAuth-данные через `app.info`.

## Интеграция с Django

Интеграция Django предоставляет декораторы для view-функций. Они собирают параметры запроса, валидируют payload и добавляют к `request` типизированные данные Битрикс24.

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

## Интеграция с FastAPI

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

## Интеграция с Flask

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
