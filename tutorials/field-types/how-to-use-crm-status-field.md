# Как работать с полем Привязка к справочникам CRM

> Scope: [`crm`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — административный доступ к разделу CRM
>
> - [crm.deal.userfield.add](../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md) — администратор CRM
> - [crm.status.entity.types](../../api-reference/crm/status/crm-status-entity-types.md) — любой пользователь
> - [crm.status.entity.items](../../api-reference/crm/status/crm-status-entity-items.md) — любой пользователь
> - [crm.item.update](../../api-reference/crm/universal/crm-item-update.md) — пользователь с правом «изменения» элементов объекта CRM
> - [crm.item.get](../../api-reference/crm/universal/crm-item-get.md) — пользователь с правом «чтения» элементов объекта CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Поле «Привязка к справочникам CRM» хранит код варианта из системного справочника CRM. В настройках поля указывают идентификатор справочника, например `INDUSTRY`, а в сделку записывают строковый код выбранного варианта `STATUS_ID`, например `IT`.

Разберем поле на примере сделок. Создадим поле «Сфера клиента» с привязкой к справочнику «Сфера деятельности», получим его варианты, сохраним выбранный код в сделке и проверим результат.

Сценарий состоит из четырех шагов.

1. Создадим поле методом [crm.deal.userfield.add](../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md)
2. Получим варианты справочника методом [crm.status.entity.items](../../api-reference/crm/status/crm-status-entity-items.md)
3. Запишем выбранный `STATUS_ID` методом [crm.item.update](../../api-reference/crm/universal/crm-item-update.md)
4. Проверим значение методом [crm.item.get](../../api-reference/crm/universal/crm-item-get.md)

В результате в поле `UF_CRM_CLIENT_INDUSTRY` будет сохранен код `IT`. В карточке сделки ему соответствует значение «Информационные технологии».

## Что нужно до начала

Подготовьте данные сценария:

- **Сделка, в которой заполним поле.** Понадобится ее `id`. У сделок `entityTypeId` равен `2`
- **Идентификатор справочника.** В примере это `INDUSTRY`. Идентификаторы доступных справочников возвращает метод [crm.status.entity.types](../../api-reference/crm/status/crm-status-entity-types.md)
- **Доступ к REST.** Вебхук или приложение с правом `crm`. Создавать пользовательские поля может только администратор CRM

Храните путь вебхука в переменной окружения и не публикуйте его в открытом коде.

В примерах используется сделка с `id = 8417`. Замените этот идентификатор на идентификатор своей сделки.

Для серверных JS-примеров с `B24Hook` нужен Node.js 18, 20, 22 или новее, для новых проектов — 22 или новее. B24JsSDK — ES module: сохраните код в файле `.mjs` или добавьте `"type": "module"` в `package.json`.

Для примеров с b24pysdk нужен Python 3.9 или новее.

{% include [Сноска о примерах](../../_includes/examples.md) %}

## 1. Создадим поле «Сфера клиента»

Метод [crm.deal.userfield.add](../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md) создает пользовательское поле сразу для всех сделок.

Передадим в `fields`:

- `FIELD_NAME` — код поля. Префикс `UF_CRM_` добавляется автоматически, если передать имя без него
- `USER_TYPE_ID` — тип поля `crm_status`
- `MULTIPLE` — значение `N`, поскольку в сделке будет одна сфера клиента
- `EDIT_FORM_LABEL` — название поля в карточке сделки
- `SETTINGS.ENTITY_TYPE` — идентификатор справочника `INDUSTRY`

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    const response = await $b24.actions.v2.call.make({
        method: 'crm.deal.userfield.add',
        params: {
            fields: {
                FIELD_NAME: 'CLIENT_INDUSTRY',
                USER_TYPE_ID: 'crm_status',
                MULTIPLE: 'N',
                EDIT_FORM_LABEL: { ru: 'Сфера клиента' },
                SETTINGS: { ENTITY_TYPE: 'INDUSTRY' }
            }
        },
        requestId: 'userfield-add-client-industry'
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    const fieldId = response.getData().result
    console.log(fieldId)
    ```

- PHP

    ```php
    <?php

    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Psr\Log\NullLogger;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook(getenv('B24_HOOK'));
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    $fieldId = $serviceBuilder
        ->core
        ->call('crm.deal.userfield.add', [
            'fields' => [
                'FIELD_NAME' => 'CLIENT_INDUSTRY',
                'USER_TYPE_ID' => 'crm_status',
                'MULTIPLE' => 'N',
                'EDIT_FORM_LABEL' => ['ru' => 'Сфера клиента'],
                'SETTINGS' => ['ENTITY_TYPE' => 'INDUSTRY'],
            ],
        ])
        ->getResponseData()
        ->getResult();

    print_r($fieldId);
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook

    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token=os.environ["B24_HOOK_TOKEN"],
    )
    # B24_HOOK_TOKEN = 'user_id/webhook_key'

    response = token.call_method("crm.deal.userfield.add", {
        "fields": {
            "FIELD_NAME": "CLIENT_INDUSTRY",
            "USER_TYPE_ID": "crm_status",
            "MULTIPLE": "N",
            "EDIT_FORM_LABEL": {"ru": "Сфера клиента"},
            "SETTINGS": {"ENTITY_TYPE": "INDUSTRY"},
        },
    })

    field_id = response["result"]
    print(field_id)
    ```

{% endlist %}

Метод возвращает идентификатор созданного поля.

```json
{
    "result": 6007771
}
```

Полное имя поля — `UF_CRM_CLIENT_INDUSTRY`. Дальше передадим `useOriginalUfNames: "Y"`, чтобы методы универсального CRM возвращали и принимали это имя без преобразования в camelCase.

Создавайте поле один раз. При повторном запуске шага используйте другое имя или пропустите создание, если поле уже существует.

## 2. Получим варианты справочника

Метод [crm.status.entity.items](../../api-reference/crm/status/crm-status-entity-items.md) возвращает варианты справочника. Передадим в `entityId` значение `INDUSTRY`, которое указали в настройках поля.

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)

    const response = await $b24.actions.v2.call.make({
        method: 'crm.status.entity.items',
        params: { entityId: 'INDUSTRY' },
        requestId: 'status-entity-items-industry'
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    const items = response.getData().result
    console.table(items)
    ```

- PHP

    ```php
    <?php

    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Psr\Log\NullLogger;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook(getenv('B24_HOOK'));

    $items = $serviceBuilder
        ->core
        ->call('crm.status.entity.items', ['entityId' => 'INDUSTRY'])
        ->getResponseData()
        ->getResult();

    print_r($items);
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook

    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token=os.environ["B24_HOOK_TOKEN"],
    )

    items = token.call_method(
        "crm.status.entity.items",
        {"entityId": "INDUSTRY"},
    )["result"]

    print(items)
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": [
        {
            "NAME": "Информационные технологии",
            "SORT": 10,
            "STATUS_ID": "IT"
        },
        {
            "NAME": "Телекоммуникации и связь",
            "SORT": 20,
            "STATUS_ID": "TELECOM"
        },
        {
            "NAME": "Производство",
            "SORT": 30,
            "STATUS_ID": "MANUFACTURING"
        }
    ]
}
```

Покажите пользователю значение `NAME`, а после выбора сохраните соответствующий `STATUS_ID`. Для варианта «Информационные технологии» это строка `IT`.

{% note warning "" %}

Не передавайте числовой `ID` записи справочника, ее название или код из другого справочника. Поле ожидает строковый `STATUS_ID` из ответа [crm.status.entity.items](../../api-reference/crm/status/crm-status-entity-items.md) для `INDUSTRY`.

Метод обновления сделки не проверяет принадлежность к справочнику и может сохранить неверное значение без ошибки. Проверяйте выбранный код на своей стороне до записи.

{% endnote %}

## 3. Запишем выбранный STATUS_ID в сделку

Метод [crm.item.update](../../api-reference/crm/universal/crm-item-update.md) обновляет сделку. Передадим:

- `entityTypeId` — значение `2` для сделок
- `id` — идентификатор сделки
- `fields.UF_CRM_CLIENT_INDUSTRY` — выбранный `STATUS_ID`, в примере `IT`
- `useOriginalUfNames` — значение `Y`, чтобы использовать исходное имя пользовательского поля

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)

    const response = await $b24.actions.v2.call.make({
        method: 'crm.item.update',
        params: {
            entityTypeId: 2,
            id: 8417,
            useOriginalUfNames: 'Y',
            fields: {
                UF_CRM_CLIENT_INDUSTRY: 'IT'
            }
        },
        requestId: 'crm-item-update-industry'
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    console.log(response.getData().result.item.UF_CRM_CLIENT_INDUSTRY)
    ```

- PHP

    ```php
    <?php

    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Psr\Log\NullLogger;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook(getenv('B24_HOOK'));

    $item = $serviceBuilder
        ->core
        ->call('crm.item.update', [
            'entityTypeId' => 2,
            'id' => 8417,
            'useOriginalUfNames' => 'Y',
            'fields' => [
                'UF_CRM_CLIENT_INDUSTRY' => 'IT',
            ],
        ])
        ->getResponseData()
        ->getResult()['item'];

    print_r($item['UF_CRM_CLIENT_INDUSTRY']);
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook

    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token=os.environ["B24_HOOK_TOKEN"],
    )

    item = token.call_method("crm.item.update", {
        "entityTypeId": 2,
        "id": 8417,
        "useOriginalUfNames": "Y",
        "fields": {
            "UF_CRM_CLIENT_INDUSTRY": "IT",
        },
    })["result"]["item"]

    print(item["UF_CRM_CLIENT_INDUSTRY"])
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": {
        "item": {
            "id": 8417,
            "title": "Проверка поля Сфера клиента для REST-туториала",
            "UF_CRM_CLIENT_INDUSTRY": "IT",
            "entityTypeId": 2
        }
    }
}
```

## 4. Проверим сохраненное значение

Метод [crm.item.get](../../api-reference/crm/universal/crm-item-get.md) возвращает сделку. Передадим тот же `entityTypeId`, `id` и `useOriginalUfNames`.

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)

    const response = await $b24.actions.v2.call.make({
        method: 'crm.item.get',
        params: {
            entityTypeId: 2,
            id: 8417,
            useOriginalUfNames: 'Y'
        },
        requestId: 'crm-item-get-industry'
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    const item = response.getData().result.item
    console.log(item.UF_CRM_CLIENT_INDUSTRY)
    ```

- PHP

    ```php
    <?php

    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Psr\Log\NullLogger;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook(getenv('B24_HOOK'));

    $item = $serviceBuilder
        ->core
        ->call('crm.item.get', [
            'entityTypeId' => 2,
            'id' => 8417,
            'useOriginalUfNames' => 'Y',
        ])
        ->getResponseData()
        ->getResult()['item'];

    print_r($item['UF_CRM_CLIENT_INDUSTRY']);
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook

    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token=os.environ["B24_HOOK_TOKEN"],
    )

    item = token.call_method("crm.item.get", {
        "entityTypeId": 2,
        "id": 8417,
        "useOriginalUfNames": "Y",
    })["result"]["item"]

    print(item["UF_CRM_CLIENT_INDUSTRY"])
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": {
        "item": {
            "id": 8417,
            "title": "Проверка поля Сфера клиента для REST-туториала",
            "UF_CRM_CLIENT_INDUSTRY": "IT",
            "entityTypeId": 2
        }
    }
}
```

Метод возвращает код `IT`, а не название «Информационные технологии». Чтобы показать название в своем интерфейсе, сопоставьте код со значением `NAME` из ответа [crm.status.entity.items](../../api-reference/crm/status/crm-status-entity-items.md).

## Проверим результат

Сценарий выполнен успешно, если:

- метод [crm.status.entity.items](../../api-reference/crm/status/crm-status-entity-items.md) вернул для справочника `INDUSTRY` вариант со `STATUS_ID: "IT"`
- после обновления сделки поле `UF_CRM_CLIENT_INDUSTRY` содержит строку `IT`
- повторный вызов [crm.item.get](../../api-reference/crm/universal/crm-item-get.md) возвращает то же значение
- в карточке сделки поле «Сфера клиента» показывает вариант «Информационные технологии»

Если код в ответе отличается от выбранного `STATUS_ID`, не считайте обновление успешным, даже когда [crm.item.update](../../api-reference/crm/universal/crm-item-update.md) вернул HTTP 200.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код или текст ошибки** | **Причина и действие** ||
|| Пустой код с текстом `The parameter entityId is not defined or invalid.` | В [crm.status.entity.items](../../api-reference/crm/status/crm-status-entity-items.md) не передан `entityId` или передано пустое значение. Укажите `INDUSTRY` ||
|| Пустой код с текстом `The parameter entityId must be a string.` | В `entityId` передан массив или значение другого типа. Передайте идентификатор справочника строкой ||
|| Пустой код с текстом `The 'FIELD_NAME' field is not found.` | В [crm.deal.userfield.add](../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md) не передано имя поля. Передайте `FIELD_NAME` ||
|| `ERROR_CORE` с текстом `Указан неверный пользовательский тип.<br>` | В `USER_TYPE_ID` передан неизвестный тип. Для привязки к справочнику CRM укажите `crm_status` ||
|| `100` с текстом `Could not find value for parameter {id}` | В [crm.item.update](../../api-reference/crm/universal/crm-item-update.md) не передан идентификатор сделки ||
|| `NOT_FOUND` с текстом `Элемент не найден` | Сделки с таким `id` нет или у пользователя нет права на ее чтение ||
|#

### Метод вернул успех, но значение неверное

Поле типа `crm_status` не проверяет значение по справочнику при записи через REST. В тестовом Битрикс24 [crm.item.update](../../api-reference/crm/universal/crm-item-update.md) вернул HTTP 200 во всех трех случаях, а [crm.item.get](../../api-reference/crm/universal/crm-item-get.md) прочитал сохраненное значение:

- числовой `ID` варианта `539` сохранился как строка `"539"`
- несуществующий код `NOT_A_REAL_INDUSTRY` сохранился без изменений
- код `CALL` из справочника `SOURCE` сохранился в поле, привязанном к `INDUSTRY`

Так же ведет себя и настройка поля. Если в `SETTINGS.ENTITY_TYPE` передать идентификатор несуществующего справочника, поле создается без ошибки и привязывается к первому справочнику из списка. Отличить такое поле можно по ответу [crm.deal.userfield.list](../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md): у правильно настроенного поля `ENTITY_TYPE` приходит строкой `INDUSTRY`, а у поля с подменой — объектом с полями `ID` и `NAME` того справочника, который подставился.

Это не ошибки метода, поэтому они не входят в таблицу выше. Перед обновлением проверьте, что выбранное значение совпадает с одним из `STATUS_ID`, полученных для нужного `entityId`. После обновления прочитайте сделку и сравните сохраненный код с отправленным.

## Что важно учитывать

- `INDUSTRY` — идентификатор справочника, а `IT` — идентификатор его варианта. Эти значения нельзя менять местами
- в поле сохраняется `STATUS_ID`, а не числовой `ID` записи справочника и не `NAME`
- [crm.item.update](../../api-reference/crm/universal/crm-item-update.md) не проверяет, существует ли код и относится ли он к справочнику из `SETTINGS.ENTITY_TYPE`
- варианты справочника берутся перед записью, а выбранный код сверяется с актуальным ответом [crm.status.entity.items](../../api-reference/crm/status/crm-status-entity-items.md)
- с параметром `useOriginalUfNames: "Y"` поле называется `UF_CRM_CLIENT_INDUSTRY`, без него универсальные методы возвращают его как `ufCrmClientIndustry`
- создание поля выполняется один раз, а получение вариантов и запись значения — при каждом выборе пользователя

## Пример кода

Код проходит все четыре шага: создает поле, получает варианты `INDUSTRY`, выбирает вариант «Информационные технологии», записывает его `STATUS_ID` в сделку и проверяет результат.

Замените вебхук и идентификатор сделки. Если поле уже существует, удалите из примера вызов [crm.deal.userfield.add](../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md).

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    const dealId = 8417

    async function call(method, params, requestId) {
        const response = await $b24.actions.v2.call.make({ method, params, requestId })

        if (!response.isSuccess) {
            throw new Error(method + ': ' + response.getErrorMessages().join('; '))
        }

        return response.getData().result
    }

    // 1. Создаем поле, связанное со справочником INDUSTRY
    await call('crm.deal.userfield.add', {
        fields: {
            FIELD_NAME: 'CLIENT_INDUSTRY',
            USER_TYPE_ID: 'crm_status',
            MULTIPLE: 'N',
            EDIT_FORM_LABEL: { ru: 'Сфера клиента' },
            SETTINGS: { ENTITY_TYPE: 'INDUSTRY' }
        }
    }, 'userfield-add-client-industry')

    // 2. Получаем варианты и берем STATUS_ID выбранного варианта
    const items = await call(
        'crm.status.entity.items',
        { entityId: 'INDUSTRY' },
        'status-entity-items-industry'
    )

    const selected = items.find((item) => item.NAME === 'Информационные технологии')

    if (!selected) {
        throw new Error('Вариант «Информационные технологии» не найден')
    }

    // 3. Записываем выбранный STATUS_ID в сделку
    await call('crm.item.update', {
        entityTypeId: 2,
        id: dealId,
        useOriginalUfNames: 'Y',
        fields: {
            UF_CRM_CLIENT_INDUSTRY: selected.STATUS_ID
        }
    }, 'crm-item-update-industry')

    // 4. Читаем сделку и проверяем сохраненный код
    const item = (await call('crm.item.get', {
        entityTypeId: 2,
        id: dealId,
        useOriginalUfNames: 'Y'
    }, 'crm-item-get-industry')).item

    if (item.UF_CRM_CLIENT_INDUSTRY !== selected.STATUS_ID) {
        throw new Error('Сохраненное значение не совпадает с выбранным STATUS_ID')
    }

    console.log(selected.NAME, item.UF_CRM_CLIENT_INDUSTRY)
    ```

- PHP

    ```php
    <?php

    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Psr\Log\NullLogger;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook(getenv('B24_HOOK'));

    $dealId = 8417;

    function callMethod($serviceBuilder, string $method, array $params = []): array
    {
        return $serviceBuilder
            ->core
            ->call($method, $params)
            ->getResponseData()
            ->getResult();
    }

    // 1. Создаем поле, связанное со справочником INDUSTRY
    callMethod($serviceBuilder, 'crm.deal.userfield.add', [
        'fields' => [
            'FIELD_NAME' => 'CLIENT_INDUSTRY',
            'USER_TYPE_ID' => 'crm_status',
            'MULTIPLE' => 'N',
            'EDIT_FORM_LABEL' => ['ru' => 'Сфера клиента'],
            'SETTINGS' => ['ENTITY_TYPE' => 'INDUSTRY'],
        ],
    ]);

    // 2. Получаем варианты и берем STATUS_ID выбранного варианта
    $items = callMethod(
        $serviceBuilder,
        'crm.status.entity.items',
        ['entityId' => 'INDUSTRY']
    );

    $selected = null;
    foreach ($items as $item) {
        if ($item['NAME'] === 'Информационные технологии') {
            $selected = $item;
            break;
        }
    }

    if ($selected === null) {
        throw new RuntimeException('Вариант «Информационные технологии» не найден');
    }

    // 3. Записываем выбранный STATUS_ID в сделку
    callMethod($serviceBuilder, 'crm.item.update', [
        'entityTypeId' => 2,
        'id' => $dealId,
        'useOriginalUfNames' => 'Y',
        'fields' => [
            'UF_CRM_CLIENT_INDUSTRY' => $selected['STATUS_ID'],
        ],
    ]);

    // 4. Читаем сделку и проверяем сохраненный код
    $item = callMethod($serviceBuilder, 'crm.item.get', [
        'entityTypeId' => 2,
        'id' => $dealId,
        'useOriginalUfNames' => 'Y',
    ])['item'];

    if ($item['UF_CRM_CLIENT_INDUSTRY'] !== $selected['STATUS_ID']) {
        throw new RuntimeException('Сохраненное значение не совпадает с выбранным STATUS_ID');
    }

    echo $selected['NAME'] . ' ' . $item['UF_CRM_CLIENT_INDUSTRY'] . PHP_EOL;
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook

    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token=os.environ["B24_HOOK_TOKEN"],
    )

    deal_id = 8417

    # 1. Создаем поле, связанное со справочником INDUSTRY
    token.call_method("crm.deal.userfield.add", {
        "fields": {
            "FIELD_NAME": "CLIENT_INDUSTRY",
            "USER_TYPE_ID": "crm_status",
            "MULTIPLE": "N",
            "EDIT_FORM_LABEL": {"ru": "Сфера клиента"},
            "SETTINGS": {"ENTITY_TYPE": "INDUSTRY"},
        },
    })

    # 2. Получаем варианты и берем STATUS_ID выбранного варианта
    items = token.call_method(
        "crm.status.entity.items",
        {"entityId": "INDUSTRY"},
    )["result"]

    selected = next(
        (item for item in items if item["NAME"] == "Информационные технологии"),
        None,
    )

    if selected is None:
        raise RuntimeError("Вариант «Информационные технологии» не найден")

    # 3. Записываем выбранный STATUS_ID в сделку
    token.call_method("crm.item.update", {
        "entityTypeId": 2,
        "id": deal_id,
        "useOriginalUfNames": "Y",
        "fields": {
            "UF_CRM_CLIENT_INDUSTRY": selected["STATUS_ID"],
        },
    })

    # 4. Читаем сделку и проверяем сохраненный код
    item = token.call_method("crm.item.get", {
        "entityTypeId": 2,
        "id": deal_id,
        "useOriginalUfNames": "Y",
    })["result"]["item"]

    if item["UF_CRM_CLIENT_INDUSTRY"] != selected["STATUS_ID"]:
        raise RuntimeError("Сохраненное значение не совпадает с выбранным STATUS_ID")

    print(selected["NAME"], item["UF_CRM_CLIENT_INDUSTRY"])
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](../../api-reference/crm/status/crm-status-entity-types.md)
- [{#T}](../../api-reference/crm/status/crm-status-entity-items.md)
- [{#T}](../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md)
- [{#T}](../../api-reference/crm/universal/crm-item-update.md)
- [{#T}](../../api-reference/crm/universal/crm-item-get.md)
