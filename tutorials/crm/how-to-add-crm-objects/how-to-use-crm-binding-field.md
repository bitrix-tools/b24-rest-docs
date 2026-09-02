# Как работать с полем Привязка к элементам CRM

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — административный доступ к разделу CRM
>
> - [crm.deal.userfield.add](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md) — администратор CRM
> - [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) — пользователь с правом «изменения» элементов объекта CRM
> - [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) — пользователь с правом «чтения» элементов объекта CRM
> - [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md) — любой пользователь

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Поле «Привязка к элементам CRM» хранит ссылку на элемент CRM — лид, сделку, контакт или компанию. Значение выглядит как `C_1`: код типа объекта и номер элемента.

Разберем на примере сделок. Заведем два поля: «Ответственный контакт» на одно значение и «Подрядчики» на несколько. Заполним их в конкретной сделке, прочитаем обратно и найдем по сохраненным значениям сами элементы.

Сценарий состоит из четырех шагов.

1. Создадим поля методом [crm.deal.userfield.add](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md)
2. Запишем значения методом [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md)
3. Прочитаем привязки методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md)
4. Развернем значения в записи методами [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md) и [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md)

## Что нужно до начала

Подготовьте данные сценария:

- **Сделка, в которой заполним поля.** Понадобится ее `id`. У сделок `entityTypeId` равен `2`. Сами поля создаются сразу для всех сделок, а не для одной
- **Элементы, к которым будем привязывать.** В примере это контакт и две компании. Их идентификаторы вернут методы [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) или [crm.contact.list](../../../api-reference/crm/contacts/crm-contact-list.md) и [crm.company.list](../../../api-reference/crm/companies/crm-company-list.md)
- **Доступ к REST.** Вебхук или приложение с правом `crm`. Поля создает только администратор CRM

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## 1. Создадим поля привязки

Создадим два поля методом [crm.deal.userfield.add](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md) с параметрами:

- `FIELD_NAME` — имя поля. Префикс `UF_CRM_` метод добавит сам, поэтому передаем только `BIND_ONE` и `BIND_MANY`
- `USER_TYPE_ID` — укажем `crm`, это и есть тип «Привязка к элементам CRM»
- `MULTIPLE` — `N` для одного значения, `Y` для нескольких
- `SETTINGS` — какие объекты разрешены в поле. Ключи `LEAD`, `CONTACT`, `COMPANY`, `DEAL` со значениями `Y` или `N`

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    const one = await $b24.actions.v2.call.make({
        method: 'crm.deal.userfield.add',
        params: {
            fields: {
                FIELD_NAME: 'BIND_ONE',
                USER_TYPE_ID: 'crm',
                MULTIPLE: 'N',
                EDIT_FORM_LABEL: { ru: 'Ответственный контакт' },
                SETTINGS: { LEAD: 'N', CONTACT: 'Y', COMPANY: 'N', DEAL: 'N' }
            }
        },
        requestId: 'userfield-add-one'
    })

    const many = await $b24.actions.v2.call.make({
        method: 'crm.deal.userfield.add',
        params: {
            fields: {
                FIELD_NAME: 'BIND_MANY',
                USER_TYPE_ID: 'crm',
                MULTIPLE: 'Y',
                EDIT_FORM_LABEL: { ru: 'Подрядчики' },
                SETTINGS: { LEAD: 'N', CONTACT: 'N', COMPANY: 'Y', DEAL: 'N' }
            }
        },
        requestId: 'userfield-add-many'
    })

    console.log(one.getData().result, many.getData().result)
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook

    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )

    # Вызов через ядро SDK: типизированной обертки для пользовательских полей нет
    one = token.call_method("crm.deal.userfield.add", {
        "fields": {
            "FIELD_NAME": "BIND_ONE",
            "USER_TYPE_ID": "crm",
            "MULTIPLE": "N",
            "EDIT_FORM_LABEL": {"ru": "Ответственный контакт"},
            "SETTINGS": {"LEAD": "N", "CONTACT": "Y", "COMPANY": "N", "DEAL": "N"},
        },
    })["result"]

    many = token.call_method("crm.deal.userfield.add", {
        "fields": {
            "FIELD_NAME": "BIND_MANY",
            "USER_TYPE_ID": "crm",
            "MULTIPLE": "Y",
            "EDIT_FORM_LABEL": {"ru": "Подрядчики"},
            "SETTINGS": {"LEAD": "N", "CONTACT": "N", "COMPANY": "Y", "DEAL": "N"},
        },
    })["result"]

    print(one, many)
    ```

- PHP

    ```php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/');

    // Вызов через ядро SDK: типизированной обертки для пользовательских полей нет
    $one = $serviceBuilder->core->call('crm.deal.userfield.add', ['fields' => [
        'FIELD_NAME' => 'BIND_ONE',
        'USER_TYPE_ID' => 'crm',
        'MULTIPLE' => 'N',
        'EDIT_FORM_LABEL' => ['ru' => 'Ответственный контакт'],
        'SETTINGS' => ['LEAD' => 'N', 'CONTACT' => 'Y', 'COMPANY' => 'N', 'DEAL' => 'N'],
    ]])->getResponseData()->getResult();

    $many = $serviceBuilder->core->call('crm.deal.userfield.add', ['fields' => [
        'FIELD_NAME' => 'BIND_MANY',
        'USER_TYPE_ID' => 'crm',
        'MULTIPLE' => 'Y',
        'EDIT_FORM_LABEL' => ['ru' => 'Подрядчики'],
        'SETTINGS' => ['LEAD' => 'N', 'CONTACT' => 'N', 'COMPANY' => 'Y', 'DEAL' => 'N'],
    ]])->getResponseData()->getResult();

    print_r([$one, $many]);
    ```
{% endlist %}

Метод вернет идентификатор созданного поля.

```json
{
    "result": 125
}
```

Полные имена полей стали `UF_CRM_BIND_ONE` и `UF_CRM_BIND_MANY`. Универсальные методы обращаются к ним в другом виде — `ufCrmBindOne` и `ufCrmBindMany`.

Имя преобразуется по-разному. Если в нем есть цифра, оно остается без изменений после приставки `ufCrm_`: поле `UF_CRM_1688736288` придет как `ufCrm_1688736288`. Не собирайте имя вручную — возьмите готовое из ответа [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md), там же видно `type` и `isMultiple` каждого поля. Список полей с исходными именами вернет [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md).

## 2. Запишем значения

Коды всех типов объектов перечислены в разделе [Формат значений для пользовательского поля «Привязка к элементам CRM»](../../../api-reference/crm/data-types.md#crm-binding-format). В примере ниже `C_1` — это контакт с `id` `1`, а `CO_1` и `CO_2` — компании.

Здесь и проходит главное отличие двух полей:

- **простое поле** принимает строку — `"C_1"`
- **множественное** принимает массив строк — `["CO_1", "CO_2"]`

Запишем оба значения одним вызовом [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md).

{% list tabs %}

- JS

    ```javascript
    const updated = await $b24.actions.v2.call.make({
        method: 'crm.item.update',
        params: {
            entityTypeId: 2,
            id: 10,
            fields: {
                ufCrmBindOne: 'C_1',
                ufCrmBindMany: ['CO_1', 'CO_2']
            }
        },
        requestId: 'crm-item-update'
    })

    if (!updated.isSuccess) {
        throw new Error(updated.getErrorMessages().join('; '))
    }
    ```

- Python

    ```python
    token.call_method("crm.item.update", {
        "entityTypeId": 2,
        "id": 10,
        "fields": {
            "ufCrmBindOne": "C_1",
            "ufCrmBindMany": ["CO_1", "CO_2"],
        },
    })
    ```

- PHP

    ```php
    $serviceBuilder->core->call('crm.item.update', [
        'entityTypeId' => 2,
        'id' => 10,
        'fields' => [
            'ufCrmBindOne' => 'C_1',
            'ufCrmBindMany' => ['CO_1', 'CO_2'],
        ],
    ]);
    ```
{% endlist %}

## 3. Прочитаем привязки

Прочитаем сделку методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) и посмотрим, что сохранилось.

{% list tabs %}

- JS

    ```javascript
    const response = await $b24.actions.v2.call.make({
        method: 'crm.item.get',
        params: { entityTypeId: 2, id: 10 },
        requestId: 'crm-item-get'
    })

    const item = response.getData().result.item

    console.log(item.ufCrmBindOne)   // 'C_1'
    console.log(item.ufCrmBindMany)  // ['CO_1', 'CO_2']
    ```

- Python

    ```python
    item = token.call_method("crm.item.get", {
        "entityTypeId": 2,
        "id": 10,
    })["result"]["item"]

    print(item["ufCrmBindOne"])   # 'C_1'
    print(item["ufCrmBindMany"])  # ['CO_1', 'CO_2']
    ```

- PHP

    ```php
    $item = $serviceBuilder->core->call('crm.item.get', [
        'entityTypeId' => 2,
        'id' => 10,
    ])->getResponseData()->getResult()['item'];

    print_r($item['ufCrmBindOne']);   // 'C_1'
    print_r($item['ufCrmBindMany']);  // ['CO_1', 'CO_2']
    ```
{% endlist %}

Поля возвращаются в том же виде, в каком записывались: простое строкой, множественное массивом. Незаполненное поле приходит со значением `null`.

```json
{
    "result": {
        "item": {
            "id": 10,
            "title": "Покупка серверов",
            "ufCrmBindOne": "C_1",
            "ufCrmBindMany": ["CO_1", "CO_2"]
        }
    }
}
```

## 4. Развернем значения в записи

Строка `C_1` сама по себе ничего не говорит пользователю. Чтобы показать имя контакта или название компании, значение нужно разобрать на код и номер, а затем получить элемент.

Соответствие кодов и типов объектов вернет метод [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md). В ответе `SYMBOL_CODE_SHORT` — это тот самый код из значения, а `ID` — идентификатор типа объекта, который принимает [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) в параметре `entityTypeId`.

{% list tabs %}

- JS

    ```javascript
    const enumResponse = await $b24.actions.v2.call.make({
        method: 'crm.enum.ownertype',
        params: {},
        requestId: 'crm-enum-ownertype'
    })

    const codes = {}
    for (const row of enumResponse.getData().result) {
        codes[row.SYMBOL_CODE_SHORT] = { entityTypeId: Number(row.ID), name: row.NAME }
    }

    const values = [item.ufCrmBindOne, ...item.ufCrmBindMany]

    for (const value of values) {
        const separator = value.lastIndexOf('_')
        const code = value.slice(0, separator)
        const elementId = Number(value.slice(separator + 1))
        const type = codes[code]

        const element = await $b24.actions.v2.call.make({
            method: 'crm.item.get',
            params: { entityTypeId: type.entityTypeId, id: elementId },
            requestId: 'crm-item-get-linked'
        })

        console.log(value, type.name, element.getData().result.item)
    }
    ```

- Python

    ```python
    rows = token.call_method("crm.enum.ownertype")["result"]
    codes = {r["SYMBOL_CODE_SHORT"]: {"entity_type_id": int(r["ID"]), "name": r["NAME"]} for r in rows}

    values = [item["ufCrmBindOne"], *item["ufCrmBindMany"]]

    for value in values:
        code, _, element_id = value.rpartition("_")
        entity_type = codes[code]

        element = token.call_method("crm.item.get", {
            "entityTypeId": entity_type["entity_type_id"],
            "id": int(element_id),
        })["result"]["item"]

        print(value, entity_type["name"], element)
    ```

- PHP

    ```php
    $rows = $serviceBuilder->core->call('crm.enum.ownertype')
        ->getResponseData()->getResult();

    $codes = [];
    foreach ($rows as $row) {
        $codes[$row['SYMBOL_CODE_SHORT']] = ['entityTypeId' => (int)$row['ID'], 'name' => $row['NAME']];
    }

    $values = array_merge([$item['ufCrmBindOne']], $item['ufCrmBindMany']);

    foreach ($values as $value) {
        $separator = strrpos($value, '_');
        $code = substr($value, 0, $separator);
        $elementId = (int)substr($value, $separator + 1);
        $type = $codes[$code];

        $element = $serviceBuilder->core->call('crm.item.get', [
            'entityTypeId' => $type['entityTypeId'],
            'id' => $elementId,
        ])->getResponseData()->getResult()['item'];

        echo $value . ' ' . $type['name'] . PHP_EOL;
        print_r($element);
    }
    ```
{% endlist %}

Разбирайте значение по **последнему** подчеркиванию: код типа сам может его содержать. Например, у смарт-процессов код выглядит как `T80`, а у реквизитов — `RQ`.

Проверяйте, что код нашелся в справочнике. Поле принимает и произвольный префикс, поэтому в значении может оказаться код, которого в ответе метода нет — в примерах ниже такая проверка есть.

Метод вернет соответствие кодов и типов.

```json
{
    "result": [
        { "ID": "1", "SYMBOL_CODE": "LEAD", "SYMBOL_CODE_SHORT": "L", "NAME": "Лид" },
        { "ID": "3", "SYMBOL_CODE": "CONTACT", "SYMBOL_CODE_SHORT": "C", "NAME": "Контакт" },
        { "ID": "4", "SYMBOL_CODE": "COMPANY", "SYMBOL_CODE_SHORT": "CO", "NAME": "Компания" }
    ]
}
```

## Проверим результат

Сценарий выполнен успешно, если:

- в поле `ufCrmBindOne` лежит строка вида `C_1`, а не массив и не значение `Array`
- в поле `ufCrmBindMany` лежит массив строк
- каждое значение разобралось на известный код и номер, и метод [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) вернул по нему элемент

В интерфейсе Битрикс24 откройте карточку сделки. Созданные поля появляются в ней автоматически, но не обязательно в первом разделе — пролистайте карточку до конца. В поле «Ответственный контакт» будет имя контакта, в поле «Подрядчики» — названия компаний через запятую.

Карточка подставляет названия сама, а метод [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) возвращает только коды и номера. Поэтому в интеграции имена приходится получать отдельно — этим и занят четвертый шаг.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `100` с текстом `Expected iterable value for multiple field, but got string instead` | Во множественное поле передана строка. Передавайте массив строк ||
|| `NOT_FOUND` в [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) | Элемента с таким `id` нет или у пользователя нет права на его чтение ||
|| `ERROR_CORE` с текстом «Поле ... уже существует» | Поле с таким именем уже заведено. Возьмите другое имя или используйте существующее поле ||
|| `ERROR_CORE` с текстом «Указан неверный пользовательский тип» | В `USER_TYPE_ID` передан несуществующий тип. Для привязки нужен `crm` ||
|| Пустой код с текстом `The 'FIELD_NAME' field is not found` | Не передано имя поля в `FIELD_NAME` ||
|#

Неверное значение чаще сохраняется, чем вызывает ошибку. Если ошибки не было, а результат неверный, проверьте:

- **в простом поле оказалась строка `Array`** — в него передали массив вместо строки. Значение потеряно, запишите его заново
- **сохранился объект не того типа** — тип, запрещенный в `SETTINGS`, все равно сохраняется. Настройки поля ограничивают выбор в интерфейсе, но не проверяют запись через REST
- **значение есть, а элемент не открывается** — привязка к несуществующему элементу тоже сохраняется. Существование элемента при записи не проверяется
- **код в значении не найден в справочнике** — произвольный префикс вроде `XX_1` сохранится без ошибки. Сверьте код с ответом [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md)

## Что важно учитывать

- Поле не проверяет значение при записи. Собирайте и сверяйте его на своей стороне: неверная привязка сохранится молча, и ошибка всплывет позже
- Проверка контейнера несимметрична: множественное поле отклонит строку, а простое молча примет массив. Тип значения выбирайте по `MULTIPLE`, а не по тому, сколько элементов привязываете сейчас
- Значение хранит только код типа и номер. Имя контакта или название компании нужно получать отдельным запросом
- Код типа берите из [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md), а не составляйте вручную. У смарт-процессов он вычисляется по особому правилу, описанному в [справочнике](../../../api-reference/crm/data-types.md#crm-binding-format)
- Не путайте формат привязки с форматом целевого объекта в автоматизации: там используется полное имя типа — `DEAL_25`, а не `D_25`

## Где еще встречаются поля привязки

Поля этого типа есть не только в CRM и не только пользовательские.

#|
|| **Где** | **Поле** | **Методы** ||
|| Объекты CRM: лид, сделка, контакт, компания, предложение | Пользовательское поле типа `crm` | [crm.deal.userfield.add](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md), [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) ||
|| Задачи | Системное поле `UF_CRM_TASK`, множественное | [tasks.task.add](../../../api-reference/tasks/tasks-task-add.md), [tasks.task.update](../../../api-reference/tasks/tasks-task-update.md) ||
|| Списки | Свойство элемента с типом привязки | [lists.field.add](../../../api-reference/lists/fields/lists-field-add.md), [lists.element.add](../../../api-reference/lists/elements/lists-element-add.md) ||
|| Торговый каталог | Свойство товара с типом `ECrm` | [catalog.productProperty.add](../../../api-reference/catalog/product-property/catalog-product-property-add.md) ||
|| События календаря | Параметр `crm_fields` | [calendar.event.add](../../../api-reference/calendar/calendar-event/calendar-event-add.md) ||
|#

Формат значения везде одинаковый — код типа и номер элемента. Отличается только то, как поле называется и каким методом заполняется.

Сценарий привязки задачи к элементу смарт-процесса разобран отдельно в туториале [{#T}](../../tasks/how-to-connect-task-to-spa.md).

## Пример кода

Код проходит все четыре шага: создает поля, записывает значения, читает их и разворачивает в записи CRM.

Замените вебхук, идентификатор сделки и идентификаторы элементов.

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)

    const entityTypeId = 2
    const dealId = 10

    async function call(method, params, requestId) {
        const response = await $b24.actions.v2.call.make({ method, params, requestId })

        if (!response.isSuccess) {
            throw new Error(method + ': ' + response.getErrorMessages().join('; '))
        }

        return response.getData().result
    }

    // 1. Создаем простое и множественное поля привязки
    await call('crm.deal.userfield.add', { fields: {
        FIELD_NAME: 'BIND_ONE',
        USER_TYPE_ID: 'crm',
        MULTIPLE: 'N',
        EDIT_FORM_LABEL: { ru: 'Ответственный контакт' },
        SETTINGS: { LEAD: 'N', CONTACT: 'Y', COMPANY: 'N', DEAL: 'N' }
    }}, 'userfield-add-one')

    await call('crm.deal.userfield.add', { fields: {
        FIELD_NAME: 'BIND_MANY',
        USER_TYPE_ID: 'crm',
        MULTIPLE: 'Y',
        EDIT_FORM_LABEL: { ru: 'Подрядчики' },
        SETTINGS: { LEAD: 'N', CONTACT: 'N', COMPANY: 'Y', DEAL: 'N' }
    }}, 'userfield-add-many')

    // 2. Записываем значения: строку в простое поле, массив во множественное
    await call('crm.item.update', {
        entityTypeId,
        id: dealId,
        fields: { ufCrmBindOne: 'C_1', ufCrmBindMany: ['CO_1', 'CO_2'] }
    }, 'crm-item-update')

    // 3. Читаем привязки
    const { item } = await call('crm.item.get', { entityTypeId, id: dealId }, 'crm-item-get')

    // 4. Разворачиваем значения в записи
    const rows = await call('crm.enum.ownertype', {}, 'crm-enum-ownertype')
    const codes = {}
    for (const row of rows) {
        codes[row.SYMBOL_CODE_SHORT] = { entityTypeId: Number(row.ID), name: row.NAME }
    }

    for (const value of [item.ufCrmBindOne, ...item.ufCrmBindMany]) {
        const separator = value.lastIndexOf('_')
        const type = codes[value.slice(0, separator)]

        if (!type) {
            console.warn('Неизвестный код типа в значении', value)
            continue
        }

        const linked = await call('crm.item.get', {
            entityTypeId: type.entityTypeId,
            id: Number(value.slice(separator + 1))
        }, 'crm-item-get-linked')

        const label = linked.item.title || [linked.item.name, linked.item.lastName].filter(Boolean).join(' ')

        console.log(value, '->', type.name, label)
    }
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook

    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )

    entity_type_id = 2
    deal_id = 10

    # 1. Создаем простое и множественное поля привязки
    token.call_method("crm.deal.userfield.add", {"fields": {
        "FIELD_NAME": "BIND_ONE",
        "USER_TYPE_ID": "crm",
        "MULTIPLE": "N",
        "EDIT_FORM_LABEL": {"ru": "Ответственный контакт"},
        "SETTINGS": {"LEAD": "N", "CONTACT": "Y", "COMPANY": "N", "DEAL": "N"},
    }})

    token.call_method("crm.deal.userfield.add", {"fields": {
        "FIELD_NAME": "BIND_MANY",
        "USER_TYPE_ID": "crm",
        "MULTIPLE": "Y",
        "EDIT_FORM_LABEL": {"ru": "Подрядчики"},
        "SETTINGS": {"LEAD": "N", "CONTACT": "N", "COMPANY": "Y", "DEAL": "N"},
    }})

    # 2. Записываем значения: строку в простое поле, массив во множественное
    token.call_method("crm.item.update", {
        "entityTypeId": entity_type_id,
        "id": deal_id,
        "fields": {"ufCrmBindOne": "C_1", "ufCrmBindMany": ["CO_1", "CO_2"]},
    })

    # 3. Читаем привязки
    item = token.call_method("crm.item.get", {
        "entityTypeId": entity_type_id,
        "id": deal_id,
    })["result"]["item"]

    # 4. Разворачиваем значения в записи
    rows = token.call_method("crm.enum.ownertype")["result"]
    codes = {r["SYMBOL_CODE_SHORT"]: {"entity_type_id": int(r["ID"]), "name": r["NAME"]} for r in rows}

    for value in [item["ufCrmBindOne"], *item["ufCrmBindMany"]]:
        code, _, element_id = value.rpartition("_")
        entity_type = codes.get(code)

        if not entity_type:
            print("Неизвестный код типа в значении", value)
            continue

        linked = token.call_method("crm.item.get", {
            "entityTypeId": entity_type["entity_type_id"],
            "id": int(element_id),
        })["result"]["item"]

        label = linked.get("title") or " ".join(filter(None, [linked.get("name"), linked.get("lastName")]))

        print(value, "->", entity_type["name"], label)
    ```

- PHP

    ```php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/');

    $entityTypeId = 2;
    $dealId = 10;

    function call($serviceBuilder, $method, $params = [])
    {
        return $serviceBuilder->core->call($method, $params)->getResponseData()->getResult();
    }

    // 1. Создаем простое и множественное поля привязки
    call($serviceBuilder, 'crm.deal.userfield.add', ['fields' => [
        'FIELD_NAME' => 'BIND_ONE',
        'USER_TYPE_ID' => 'crm',
        'MULTIPLE' => 'N',
        'EDIT_FORM_LABEL' => ['ru' => 'Ответственный контакт'],
        'SETTINGS' => ['LEAD' => 'N', 'CONTACT' => 'Y', 'COMPANY' => 'N', 'DEAL' => 'N'],
    ]]);

    call($serviceBuilder, 'crm.deal.userfield.add', ['fields' => [
        'FIELD_NAME' => 'BIND_MANY',
        'USER_TYPE_ID' => 'crm',
        'MULTIPLE' => 'Y',
        'EDIT_FORM_LABEL' => ['ru' => 'Подрядчики'],
        'SETTINGS' => ['LEAD' => 'N', 'CONTACT' => 'N', 'COMPANY' => 'Y', 'DEAL' => 'N'],
    ]]);

    // 2. Записываем значения: строку в простое поле, массив во множественное
    call($serviceBuilder, 'crm.item.update', [
        'entityTypeId' => $entityTypeId,
        'id' => $dealId,
        'fields' => ['ufCrmBindOne' => 'C_1', 'ufCrmBindMany' => ['CO_1', 'CO_2']],
    ]);

    // 3. Читаем привязки
    $item = call($serviceBuilder, 'crm.item.get', [
        'entityTypeId' => $entityTypeId,
        'id' => $dealId,
    ])['item'];

    // 4. Разворачиваем значения в записи
    $codes = [];
    foreach (call($serviceBuilder, 'crm.enum.ownertype') as $row) {
        $codes[$row['SYMBOL_CODE_SHORT']] = ['entityTypeId' => (int)$row['ID'], 'name' => $row['NAME']];
    }

    foreach (array_merge([$item['ufCrmBindOne']], $item['ufCrmBindMany']) as $value) {
        $separator = strrpos($value, '_');
        $code = substr($value, 0, $separator);

        if (!isset($codes[$code])) {
            echo 'Неизвестный код типа в значении ' . $value . PHP_EOL;
            continue;
        }

        $linked = call($serviceBuilder, 'crm.item.get', [
            'entityTypeId' => $codes[$code]['entityTypeId'],
            'id' => (int)substr($value, $separator + 1),
        ])['item'];

        $label = $linked['title'] ?? trim(($linked['name'] ?? '') . ' ' . ($linked['lastName'] ?? ''));

        echo $value . ' -> ' . $codes[$code]['name'] . ' ' . $label . PHP_EOL;
    }
    ```
{% endlist %}

## Продолжите изучение

- [Формат значений для поля «Привязка к элементам CRM»](../../../api-reference/crm/data-types.md#crm-binding-format)
- [Тип объекта CRM](../../../api-reference/crm/data-types.md#object_type)
- [{#T}](../../tasks/how-to-connect-task-to-spa.md)
- [{#T}](./how-to-add-user-field-to-spa.md)
- [Добавить пользовательское поле сделки crm.deal.userfield.add](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md)
- [Получить типы объектов CRM crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md)
