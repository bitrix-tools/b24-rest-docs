# Как работать с полем Привязка к элементам инфоблоков

> Scope: [`crm`, `lists`, `catalog`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: права разных модулей складываются, нужны все перечисленные
>
> - [crm.deal.userfield.add](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md) — администратор CRM
> - [crm.deal.update](../../../api-reference/crm/deals/crm-deal-update.md) и [crm.deal.get](../../../api-reference/crm/deals/crm-deal-get.md) — пользователь с правом «изменения» и «чтения» сделок
> - [lists.get](../../../api-reference/lists/lists/lists-get.md) и [lists.element.get](../../../api-reference/lists/elements/lists-element-get.md) — пользователь с правом «Чтение» для нужного списка
> - [catalog.catalog.list](../../../api-reference/catalog/catalog/catalog-catalog-list.md) и [catalog.product.get](../../../api-reference/catalog/product/catalog-product-get.md) — администратор
> - [catalog.product.list](../../../api-reference/catalog/product/catalog-product-list.md) — пользователь с правом на просмотр каталога товаров и правом на чтение инфоблока торгового каталога

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Поле «Привязка к элементам инфоблоков» хранит идентификаторы элементов инфоблока: записей списка или товаров каталога. В ответе методов такое поле выглядит как число `7007` или массив чисел `[533, 541]` — названий элементов там нет, их нужно получать отдельным вызовом.

Поле привязывается к одному инфоблоку через настройку `IBLOCK_ID`. Тип инфоблока в настройках не хранится, поэтому идентификатор нужно получить заранее: для списков — методами группы `lists.*`, для товаров — методами группы `catalog.*`.

Разберем на примере сделок. Заведем два поля: одиночное со ссылкой на запись списка и множественное со ссылкой на товары каталога. Заполним их в конкретной сделке, прочитаем обратно и развернем идентификаторы в названия элементов.

Сценарий состоит из пяти шагов.

1. Найдем инфоблок методами [lists.get](../../../api-reference/lists/lists/lists-get.md) и [catalog.catalog.list](../../../api-reference/catalog/catalog/catalog-catalog-list.md)
2. Создадим поля привязки методом [crm.deal.userfield.add](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md)
3. Получим идентификаторы элементов методами [lists.element.get](../../../api-reference/lists/elements/lists-element-get.md) и [catalog.product.list](../../../api-reference/catalog/product/catalog-product-list.md)
4. Запишем значения методом [crm.deal.update](../../../api-reference/crm/deals/crm-deal-update.md)
5. Развернем значения в названия методами [crm.deal.get](../../../api-reference/crm/deals/crm-deal-get.md), [lists.element.get](../../../api-reference/lists/elements/lists-element-get.md) и [catalog.product.get](../../../api-reference/catalog/product/catalog-product-get.md)

В результате в сделке будут заполнены оба поля, а по сохраненным идентификаторам вы получите названия записи списка и товаров.

## Что нужно до начала

Подготовьте данные сценария:

- **Инфоблок, к которому привязываем.** Это список Битрикс24 или товарный каталог. Его идентификатор получим на первом шаге
- **Сделка, в которой заполним поля.** Понадобится ее `id`. Сами поля создаются сразу для всех сделок, а не для одной
- **Доступ к REST.** Вебхук или приложение со scope `crm`, `lists` и `catalog`. Поля создает только администратор CRM

Вебхук выполняет запросы с правами создавшего его пользователя. Если у этого пользователя нет доступа к списку или к каталогу, методы вернут ошибку доступа, хотя сами методы вызваны верно.

Дальше в примерах используем список с идентификатором `123`, товарный каталог с идентификатором `25` и сделку `8415`. В вашем Битрикс24 эти значения будут другими: идентификаторы инфоблоков возьмите из ответов первого шага, идентификатор сделки — из своей сделки.

Для серверных JS-примеров с `B24Hook` нужен Node.js 18, 20, 22 или новее, для новых проектов — 22 или новее. B24JsSDK — ES module: сохраните код в файле `.mjs` или добавьте `"type": "module"` в `package.json`. Для примеров с b24pysdk нужен Python 3.9 или новее.

Храните путь вебхука в переменной окружения и не публикуйте его в открытом коде.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## 1. Найдем инфоблок и его идентификатор

Списки и товарные каталоги — это инфоблоки разных типов, и получают их разными методами.

Метод [lists.get](../../../api-reference/lists/lists/lists-get.md) возвращает списки одного типа. Передайте параметр:

- `IBLOCK_TYPE_ID` — тип инфоблока. `lists` — обычные списки, `bitrix_processes` — списки процессов

Метод [catalog.catalog.list](../../../api-reference/catalog/catalog/catalog-catalog-list.md) возвращает торговые каталоги без параметров.

В ответах сохраните:

- `ID` списка — передадим в настройку `IBLOCK_ID` одиночного поля
- `iblockId` каталога — передадим в настройку `IBLOCK_ID` множественного поля

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    // Типизированных оберток для методов списков и каталога в SDK нет, вызываем их через ядро SDK
    async function callMethod(method, params, requestId) {
        const response = await $b24.actions.v2.call.make({
            method,
            params,
            requestId
        })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }

        return response.getData().result
    }

    const lists = await callMethod(
        'lists.get',
        { IBLOCK_TYPE_ID: 'lists' },
        'lists-get'
    )

    const catalogs = await callMethod(
        'catalog.catalog.list',
        {},
        'catalog-catalog-list'
    )

    console.table(lists.map((list) => ({ ID: list.ID, NAME: list.NAME })))
    console.table(catalogs.catalogs)
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

    // Типизированных оберток для методов списков и каталога в SDK нет, вызываем их через ядро SDK
    function callMethod($serviceBuilder, string $method, array $params = []): mixed
    {
        return $serviceBuilder
            ->core
            ->call($method, $params)
            ->getResponseData()
            ->getResult();
    }

    $lists = callMethod($serviceBuilder, 'lists.get', ['IBLOCK_TYPE_ID' => 'lists']);
    $catalogs = callMethod($serviceBuilder, 'catalog.catalog.list');

    print_r($lists);
    print_r($catalogs['catalogs']);
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook

    bitrix_token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token=os.environ["B24_HOOK_TOKEN"],
    )
    # B24_HOOK_TOKEN = 'USER_ID/TOKEN'

    def call_method(method, params=None):
        # Типизированных оберток для методов списков и каталога в SDK нет, вызываем их напрямую
        return bitrix_token.call_method(
            api_method=method,
            params=params or {},
        )["result"]

    lists = call_method("lists.get", {"IBLOCK_TYPE_ID": "lists"})
    catalogs = call_method("catalog.catalog.list")

    print(lists)
    print(catalogs["catalogs"])
    ```

{% endlist %}

Сокращенный ответ [lists.get](../../../api-reference/lists/lists/lists-get.md):

```json
{
    "result": [
        {
            "ID": "123",
            "IBLOCK_TYPE_ID": "lists",
            "NAME": "Обновленный список задач",
            "ACTIVE": "Y"
        }
    ],
    "total": 1
}
```

Сокращенный ответ [catalog.catalog.list](../../../api-reference/catalog/catalog/catalog-catalog-list.md):

```json
{
    "result": {
        "catalogs": [
            {
                "id": 25,
                "iblockId": 25,
                "iblockTypeId": "CRM_PRODUCT_CATALOG",
                "name": "Товарный каталог CRM",
                "productIblockId": null
            },
            {
                "id": 27,
                "iblockId": 27,
                "iblockTypeId": "CRM_PRODUCT_CATALOG",
                "name": "Товарный каталог CRM (предложения)",
                "productIblockId": 25
            }
        ]
    },
    "total": 2
}
```

Каталог с заполненным `productIblockId` — это инфоблок торговых предложений. Привязка к нему хранит вариации товара, а не сами товары. Для сценария берем каталог с `productIblockId: null`, в примере это `25`.

## 2. Создадим поля привязки

Метод [crm.deal.userfield.add](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md) создает пользовательское поле для всех сделок. Передайте параметры:

- `FIELD_NAME` — код поля. Параметр обязательный. Если код не начинается с `UF_CRM_`, префикс добавится автоматически: `MY_FIELD` превратится в `UF_CRM_MY_FIELD`
- `USER_TYPE_ID` — тип поля, для привязки к элементам инфоблоков это `iblock_element`
- `MULTIPLE` — `Y` для нескольких значений, `N` для одного
- `EDIT_FORM_LABEL` — название поля в карточке, по языкам
- `SETTINGS.IBLOCK_ID` — идентификатор инфоблока с первого шага. Без него метод вернет ошибку
- `SETTINGS.DISPLAY` — вид элемента управления в карточке: `UI`, `DIALOG`, `LIST` или `CHECKBOX`

Полный список типов полей возвращает метод [crm.userfield.types](../../../api-reference/crm/universal/user-defined-fields/crm-userfield-types.md). Для привязки к разделам инфоблока есть отдельный тип `iblock_section`.

В ответе сохраните идентификаторы созданных полей: по ним можно прочитать настройки методом [crm.deal.userfield.get](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-get.md).

{% list tabs %}

- JS

    ```js
    const listFieldId = await callMethod(
        'crm.deal.userfield.add',
        {
            fields: {
                FIELD_NAME: 'UF_CRM_IB_LIST',
                USER_TYPE_ID: 'iblock_element',
                MULTIPLE: 'N',
                EDIT_FORM_LABEL: { ru: 'Элемент списка', en: 'List element' },
                SETTINGS: { IBLOCK_ID: 123, DISPLAY: 'UI' }
            }
        },
        'userfield-add-list'
    )

    const productFieldId = await callMethod(
        'crm.deal.userfield.add',
        {
            fields: {
                FIELD_NAME: 'UF_CRM_IB_PROD',
                USER_TYPE_ID: 'iblock_element',
                MULTIPLE: 'Y',
                EDIT_FORM_LABEL: { ru: 'Товары каталога', en: 'Catalog products' },
                SETTINGS: { IBLOCK_ID: 25, DISPLAY: 'UI' }
            }
        },
        'userfield-add-product'
    )

    console.log(listFieldId, productFieldId)
    ```

- PHP

    ```php
    $listFieldId = callMethod($serviceBuilder, 'crm.deal.userfield.add', [
        'fields' => [
            'FIELD_NAME' => 'UF_CRM_IB_LIST',
            'USER_TYPE_ID' => 'iblock_element',
            'MULTIPLE' => 'N',
            'EDIT_FORM_LABEL' => ['ru' => 'Элемент списка', 'en' => 'List element'],
            'SETTINGS' => ['IBLOCK_ID' => 123, 'DISPLAY' => 'UI'],
        ],
    ]);

    $productFieldId = callMethod($serviceBuilder, 'crm.deal.userfield.add', [
        'fields' => [
            'FIELD_NAME' => 'UF_CRM_IB_PROD',
            'USER_TYPE_ID' => 'iblock_element',
            'MULTIPLE' => 'Y',
            'EDIT_FORM_LABEL' => ['ru' => 'Товары каталога', 'en' => 'Catalog products'],
            'SETTINGS' => ['IBLOCK_ID' => 25, 'DISPLAY' => 'UI'],
        ],
    ]);

    print_r([$listFieldId, $productFieldId]);
    ```

- Python

    ```python
    list_field_id = call_method(
        "crm.deal.userfield.add",
        {
            "fields": {
                "FIELD_NAME": "UF_CRM_IB_LIST",
                "USER_TYPE_ID": "iblock_element",
                "MULTIPLE": "N",
                "EDIT_FORM_LABEL": {"ru": "Элемент списка", "en": "List element"},
                "SETTINGS": {"IBLOCK_ID": 123, "DISPLAY": "UI"},
            },
        },
    )

    product_field_id = call_method(
        "crm.deal.userfield.add",
        {
            "fields": {
                "FIELD_NAME": "UF_CRM_IB_PROD",
                "USER_TYPE_ID": "iblock_element",
                "MULTIPLE": "Y",
                "EDIT_FORM_LABEL": {"ru": "Товары каталога", "en": "Catalog products"},
                "SETTINGS": {"IBLOCK_ID": 25, "DISPLAY": "UI"},
            },
        },
    )

    print(list_field_id, product_field_id)
    ```

{% endlist %}

Ответ содержит идентификатор поля:

```json
{
    "result": 6007761
}
```

Настройки поля можно прочитать методом [crm.deal.userfield.get](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-get.md). Сокращенный ответ:

```json
{
    "result": {
        "ID": "6007761",
        "ENTITY_ID": "CRM_DEAL",
        "FIELD_NAME": "UF_CRM_IB_LIST",
        "USER_TYPE_ID": "iblock_element",
        "MULTIPLE": "N",
        "SETTINGS": {
            "DISPLAY": "UI",
            "LIST_HEIGHT": 1,
            "IBLOCK_ID": 123,
            "DEFAULT_VALUE": "",
            "ACTIVE_FILTER": "N"
        }
    }
}
```

Сохраняются только пять настроек. Тип инфоблока среди них не хранится: поле знает лишь `IBLOCK_ID`. Значение `FIELD_NAME` понадобится на четвертом шаге — именно под этим ключом записываются значения.

## 3. Получим идентификаторы элементов

Записи списка возвращает метод [lists.element.get](../../../api-reference/lists/elements/lists-element-get.md). Передайте параметры:

- `IBLOCK_TYPE_ID` — тип инфоблока, тот же, что на первом шаге
- `IBLOCK_ID` — идентификатор списка
- `ELEMENT_ID` — идентификатор одной записи, если нужна конкретная

Товары каталога возвращает метод [catalog.product.list](../../../api-reference/catalog/product/catalog-product-list.md). Передайте параметры:

- `filter.iblockId` — идентификатор каталога, иначе в ответ попадут товары всех каталогов
- `select` — поля товара, для сценария достаточно `id`, `iblockId` и `name`
- `start` — смещение постраничной навигации

В ответах сохраните `ID` записи списка и `id` товаров: их запишем в поля на следующем шаге.

{% list tabs %}

- JS

    ```js
    const listElements = await callMethod(
        'lists.element.get',
        {
            IBLOCK_TYPE_ID: 'lists',
            IBLOCK_ID: 123
        },
        'lists-element-get'
    )

    const products = await callMethod(
        'catalog.product.list',
        {
            select: ['id', 'iblockId', 'name'],
            filter: { iblockId: 25 },
            start: 0
        },
        'catalog-product-list'
    )

    const elementId = Number(listElements[0].ID)
    const productIds = products.products.slice(0, 2).map((product) => product.id)

    console.log(elementId, productIds)
    ```

- PHP

    ```php
    $listElements = callMethod($serviceBuilder, 'lists.element.get', [
        'IBLOCK_TYPE_ID' => 'lists',
        'IBLOCK_ID' => 123,
    ]);

    $products = callMethod($serviceBuilder, 'catalog.product.list', [
        'select' => ['id', 'iblockId', 'name'],
        'filter' => ['iblockId' => 25],
        'start' => 0,
    ]);

    $elementId = (int)$listElements[0]['ID'];
    $productIds = array_map(
        static fn(array $product): int => (int)$product['id'],
        array_slice($products['products'], 0, 2)
    );

    print_r([$elementId, $productIds]);
    ```

- Python

    ```python
    list_elements = call_method(
        "lists.element.get",
        {
            "IBLOCK_TYPE_ID": "lists",
            "IBLOCK_ID": 123,
        },
    )

    products = call_method(
        "catalog.product.list",
        {
            "select": ["id", "iblockId", "name"],
            "filter": {"iblockId": 25},
            "start": 0,
        },
    )

    element_id = int(list_elements[0]["ID"])
    product_ids = [product["id"] for product in products["products"][:2]]

    print(element_id, product_ids)
    ```

{% endlist %}

Сокращенный ответ [lists.element.get](../../../api-reference/lists/elements/lists-element-get.md):

```json
{
    "result": [
        {
            "ID": "7007",
            "IBLOCK_ID": "123",
            "NAME": "Элемент для проверки полей",
            "IBLOCK_SECTION_ID": null
        }
    ],
    "total": 1
}
```

Сокращенный ответ [catalog.product.list](../../../api-reference/catalog/product/catalog-product-list.md):

```json
{
    "result": {
        "products": [
            { "id": 533, "iblockId": 25, "name": "тест" },
            { "id": 541, "iblockId": 25, "name": "Простой товар для 1с для 1с" }
        ]
    },
    "total": 2
}
```

Получили идентификатор записи списка `7007` и идентификаторы товаров `533` и `541`.

## 4. Запишем значения

Метод [crm.deal.update](../../../api-reference/crm/deals/crm-deal-update.md) записывает значения в поля сделки. Передайте параметры:

- `id` — идентификатор сделки
- `fields` — объект с кодами полей. В одиночное поле передайте число, в множественное — массив чисел

Битрикс24 не проверяет переданные идентификаторы: метод примет и несуществующий элемент, и элемент чужого инфоблока, и вернет `true`. Поэтому перед записью проверьте элементы сами. Запись списка ищем методом [lists.element.get](../../../api-reference/lists/elements/lists-element-get.md) по `ELEMENT_ID`: пустой массив в ответе означает, что записи в этом списке нет. Товар получаем методом [catalog.product.get](../../../api-reference/catalog/product/catalog-product-get.md) и сверяем его `iblockId` с инфоблоком поля.

{% list tabs %}

- JS

    ```js
    async function isListElementValid(iblockTypeId, iblockId, id) {
        const found = await callMethod(
            'lists.element.get',
            {
                IBLOCK_TYPE_ID: iblockTypeId,
                IBLOCK_ID: iblockId,
                ELEMENT_ID: id
            },
            `lists-element-check-${id}`
        )

        return found.length > 0
    }

    async function isProductValid(iblockId, id) {
        try {
            const found = await callMethod(
                'catalog.product.get',
                { id },
                `catalog-product-check-${id}`
            )

            return found.product.iblockId === iblockId
        } catch (error) {
            return false
        }
    }

    if (!(await isListElementValid('lists', 123, elementId))) {
        throw new Error(`Записи ${elementId} нет в списке 123`)
    }

    const validProductIds = []

    for (const productId of productIds) {
        if (await isProductValid(25, productId)) {
            validProductIds.push(productId)
        }
    }

    await callMethod(
        'crm.deal.update',
        {
            id: 8415,
            fields: {
                UF_CRM_IB_LIST: elementId,
                UF_CRM_IB_PROD: validProductIds
            }
        },
        'deal-update-bindings'
    )
    ```

- PHP

    ```php
    function isListElementValid($serviceBuilder, string $iblockTypeId, int $iblockId, int $id): bool
    {
        $found = callMethod($serviceBuilder, 'lists.element.get', [
            'IBLOCK_TYPE_ID' => $iblockTypeId,
            'IBLOCK_ID' => $iblockId,
            'ELEMENT_ID' => $id,
        ]);

        return $found !== [];
    }

    function isProductValid($serviceBuilder, int $iblockId, int $id): bool
    {
        try {
            $found = callMethod($serviceBuilder, 'catalog.product.get', ['id' => $id]);
        } catch (Throwable $error) {
            return false;
        }

        return (int)$found['product']['iblockId'] === $iblockId;
    }

    if (!isListElementValid($serviceBuilder, 'lists', 123, $elementId)) {
        throw new RuntimeException('Записи ' . $elementId . ' нет в списке 123');
    }

    $validProductIds = [];

    foreach ($productIds as $productId) {
        if (isProductValid($serviceBuilder, 25, $productId)) {
            $validProductIds[] = $productId;
        }
    }

    callMethod($serviceBuilder, 'crm.deal.update', [
        'id' => 8415,
        'fields' => [
            'UF_CRM_IB_LIST' => $elementId,
            'UF_CRM_IB_PROD' => $validProductIds,
        ],
    ]);
    ```

- Python

    ```python
    def is_list_element_valid(iblock_type_id, iblock_id, element):
        found = call_method(
            "lists.element.get",
            {
                "IBLOCK_TYPE_ID": iblock_type_id,
                "IBLOCK_ID": iblock_id,
                "ELEMENT_ID": element,
            },
        )

        return len(found) > 0

    def is_product_valid(iblock_id, product):
        try:
            found = call_method("catalog.product.get", {"id": product})
        except Exception:
            return False

        return found["product"]["iblockId"] == iblock_id

    if not is_list_element_valid("lists", 123, element_id):
        raise RuntimeError(f"Записи {element_id} нет в списке 123")

    valid_product_ids = [
        product_id for product_id in product_ids if is_product_valid(25, product_id)
    ]

    call_method(
        "crm.deal.update",
        {
            "id": 8415,
            "fields": {
                "UF_CRM_IB_LIST": element_id,
                "UF_CRM_IB_PROD": valid_product_ids,
            },
        },
    )
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": true
}
```

Значение `true` подтверждает, что сделка обновлена, но ничего не говорит о корректности привязок. Проверить сами значения можно только чтением на следующем шаге.

## 5. Развернем значения в названия

Метод [crm.deal.get](../../../api-reference/crm/deals/crm-deal-get.md) возвращает сделку со всеми пользовательскими полями. Одиночное поле приходит строкой, множественное — массивом чисел.

Названия элементов в сделке не хранятся. Чтобы их получить, запросите записи списка методом [lists.element.get](../../../api-reference/lists/elements/lists-element-get.md), а товары — методом [catalog.product.get](../../../api-reference/catalog/product/catalog-product-get.md) по одному идентификатору за вызов.

{% list tabs %}

- JS

    ```js
    const deal = await callMethod('crm.deal.get', { id: 8415 }, 'deal-get')

    const boundElementId = Number(deal.UF_CRM_IB_LIST)
    const boundProductIds = deal.UF_CRM_IB_PROD ?? []

    const elements = boundElementId > 0
        ? await callMethod(
            'lists.element.get',
            {
                IBLOCK_TYPE_ID: 'lists',
                IBLOCK_ID: 123,
                ELEMENT_ID: boundElementId
            },
            'lists-element-resolve'
        )
        : []

    const boundProducts = []

    for (const productId of boundProductIds) {
        const found = await callMethod(
            'catalog.product.get',
            { id: productId },
            `catalog-product-resolve-${productId}`
        )

        boundProducts.push({ id: found.product.id, name: found.product.name })
    }

    console.log(elements[0]?.NAME)
    console.table(boundProducts)
    ```

- PHP

    ```php
    $deal = callMethod($serviceBuilder, 'crm.deal.get', ['id' => 8415]);

    $boundElementId = (int)$deal['UF_CRM_IB_LIST'];
    $boundProductIds = $deal['UF_CRM_IB_PROD'] ?? [];

    $elements = $boundElementId > 0
        ? callMethod($serviceBuilder, 'lists.element.get', [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => 123,
            'ELEMENT_ID' => $boundElementId,
        ])
        : [];

    $boundProducts = [];

    foreach ($boundProductIds as $productId) {
        $found = callMethod($serviceBuilder, 'catalog.product.get', ['id' => (int)$productId]);

        $boundProducts[] = [
            'id' => $found['product']['id'],
            'name' => $found['product']['name'],
        ];
    }

    print_r($elements[0]['NAME'] ?? null);
    print_r($boundProducts);
    ```

- Python

    ```python
    deal = call_method("crm.deal.get", {"id": 8415})

    bound_element_id = int(deal["UF_CRM_IB_LIST"] or 0)
    bound_product_ids = deal.get("UF_CRM_IB_PROD") or []

    elements = (
        call_method(
            "lists.element.get",
            {
                "IBLOCK_TYPE_ID": "lists",
                "IBLOCK_ID": 123,
                "ELEMENT_ID": bound_element_id,
            },
        )
        if bound_element_id > 0
        else []
    )

    bound_products = []

    for product_id in bound_product_ids:
        found = call_method("catalog.product.get", {"id": product_id})
        bound_products.append(
            {"id": found["product"]["id"], "name": found["product"]["name"]}
        )

    print(elements[0]["NAME"] if elements else None)
    print(bound_products)
    ```

{% endlist %}

Сокращенный ответ [crm.deal.get](../../../api-reference/crm/deals/crm-deal-get.md):

```json
{
    "result": {
        "ID": "8415",
        "TITLE": "Проверка привязки к инфоблокам",
        "UF_CRM_IB_LIST": "7007",
        "UF_CRM_IB_PROD": [533, 541]
    }
}
```

Сокращенный ответ [catalog.product.get](../../../api-reference/catalog/product/catalog-product-get.md):

```json
{
    "result": {
        "product": {
            "id": 533,
            "iblockId": 25,
            "name": "тест"
        }
    }
}
```

Поле `iblockId` в ответе товара — это тот же идентификатор, который указан в настройке `IBLOCK_ID` поля. Их совпадение подтверждает, что товар относится к нужному каталогу.

## Проверим результат

Сценарий выполнен, если после чтения сделки оба поля заполнены и по каждому идентификатору находится элемент.

Что проверить в ответах:

- `UF_CRM_IB_LIST` содержит строку с идентификатором записи, а не `"0"` и не пустую строку
- `UF_CRM_IB_PROD` содержит массив с идентификаторами товаров
- [lists.element.get](../../../api-reference/lists/elements/lists-element-get.md) с этим `ELEMENT_ID` вернул одну запись, а не пустой массив
- [catalog.product.get](../../../api-reference/catalog/product/catalog-product-get.md) вернул товар, и его `iblockId` совпадает с `IBLOCK_ID` поля

В интерфейсе откройте карточку сделки: в полях «Элемент списка» и «Товары каталога» будут названия элементов. Пустое поле в карточке при непустом значении в ответе означает, что сохраненного элемента в привязанном инфоблоке нет.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код или текст ошибки** | **Причина и действие** ||
|| `The 'FIELD_NAME' field is not found.` | В [crm.deal.userfield.add](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md) не передан код поля. Передайте `FIELD_NAME` ||
|| `ERROR_CORE`, `Выберите инфоблок, с которым нужно связать поле` | В настройках поля нет `SETTINGS.IBLOCK_ID`. Передайте идентификатор инфоблока с первого шага ||
|| `ACCESS_DENIED`, `Нет прав для просмотра и редактирования списка.` | [lists.get](../../../api-reference/lists/lists/lists-get.md) вызван с типом инфоблока, который не относится к спискам, например `catalog`. Для товаров используйте [catalog.catalog.list](../../../api-reference/catalog/catalog/catalog-catalog-list.md) ||
|| `product does not exist.` | [catalog.product.get](../../../api-reference/catalog/product/catalog-product-get.md) вызван с идентификатором несуществующего товара. Получите идентификаторы методом [catalog.product.list](../../../api-reference/catalog/product/catalog-product-list.md) ||
|#

Если ошибки не было, а привязка не работает, проверьте сохраненное значение методом [crm.deal.get](../../../api-reference/crm/deals/crm-deal-get.md).

- Значение `"0"` означает, что в поле передали строку вместо числа. Нечисловое значение приводится к нулю, ошибку метод не возвращает
- Значение `"1"` в одиночном поле означает, что в него передали массив. Одиночное поле принимает только число, массив приводится к единице, а не к первому элементу
- Значение есть, а в карточке пусто — сохранен идентификатор несуществующего элемента или элемента другого инфоблока. Проверьте элемент методом [lists.element.get](../../../api-reference/lists/elements/lists-element-get.md) или [catalog.product.get](../../../api-reference/catalog/product/catalog-product-get.md) и запишите значение заново
- Поле создалось, но в карточке нет списка для выбора — в `SETTINGS.IBLOCK_ID` указан несуществующий инфоблок. Такое поле создается без ошибки. Проверьте настройку методом [crm.deal.userfield.get](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-get.md)
- В карточке не тот элемент управления, который вы задали — в `SETTINGS.DISPLAY` передано неизвестное значение, и оно заменено на `UI`

Чтобы очистить привязку, передайте в поле пустую строку. Повторный запуск сценария перезаписывает значения, дубликаты не создаются.

## Что важно учитывать

- Поле привязано к одному инфоблоку. Тип инфоблока в настройках не хранится, сохраняется только `IBLOCK_ID`
- Битрикс24 не проверяет, что элемент существует и относится к привязанному инфоблоку. Проверка идентификаторов — задача вашей интеграции
- Одиночное поле возвращается строкой, множественное — массивом чисел. Учитывайте это при разборе ответа
- Инфоблок торговых предложений — отдельный каталог с заполненным `productIblockId`. Привязка к нему хранит вариации товара, а не товары
- [catalog.product.list](../../../api-reference/catalog/product/catalog-product-list.md) и [lists.element.get](../../../api-reference/lists/elements/lists-element-get.md) возвращают элементы страницами по 50. Для полного перебора увеличивайте `start`
- Для других объектов CRM поля создают одноименными методами, например [crm.lead.userfield.add](../../../api-reference/crm/leads/userfield/crm-lead-userfield-add.md), а в смарт-процессе — методом [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md)
- Для привязки к разделам инфоблока используйте тип поля `iblock_section`, он разобран в туториале [{#T}](./how-to-use-iblock-section-binding-field.md)

## Пример кода

Полный сценарий одним скриптом: находит инфоблоки, создает оба поля, проверяет элементы, записывает значения и разворачивает их в названия.

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    const LIST_IBLOCK_TYPE = 'lists'
    const DEAL_ID = 8415

    // Типизированных оберток для методов списков и каталога в SDK нет, вызываем их через ядро SDK
    async function callMethod(method, params, requestId) {
        const response = await $b24.actions.v2.call.make({ method, params, requestId })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }

        return response.getData().result
    }

    async function main() {
        const lists = await callMethod('lists.get', { IBLOCK_TYPE_ID: LIST_IBLOCK_TYPE }, 'lists-get')
        const catalogs = await callMethod('catalog.catalog.list', {}, 'catalog-catalog-list')

        const listIblockId = Number(lists[0].ID)
        const catalog = catalogs.catalogs.find((item) => item.productIblockId === null)
        const catalogIblockId = catalog.iblockId

        await callMethod('crm.deal.userfield.add', {
            fields: {
                FIELD_NAME: 'UF_CRM_IB_LIST',
                USER_TYPE_ID: 'iblock_element',
                MULTIPLE: 'N',
                EDIT_FORM_LABEL: { ru: 'Элемент списка', en: 'List element' },
                SETTINGS: { IBLOCK_ID: listIblockId, DISPLAY: 'UI' }
            }
        }, 'userfield-add-list')

        await callMethod('crm.deal.userfield.add', {
            fields: {
                FIELD_NAME: 'UF_CRM_IB_PROD',
                USER_TYPE_ID: 'iblock_element',
                MULTIPLE: 'Y',
                EDIT_FORM_LABEL: { ru: 'Товары каталога', en: 'Catalog products' },
                SETTINGS: { IBLOCK_ID: catalogIblockId, DISPLAY: 'UI' }
            }
        }, 'userfield-add-product')

        const listElements = await callMethod('lists.element.get', {
            IBLOCK_TYPE_ID: LIST_IBLOCK_TYPE,
            IBLOCK_ID: listIblockId
        }, 'lists-element-get')

        const products = await callMethod('catalog.product.list', {
            select: ['id', 'iblockId', 'name'],
            filter: { iblockId: catalogIblockId },
            start: 0
        }, 'catalog-product-list')

        const elementId = Number(listElements[0].ID)
        const productIds = products.products.slice(0, 2).map((product) => product.id)

        const validProductIds = []

        for (const productId of productIds) {
            const found = await callMethod('catalog.product.get', { id: productId }, `catalog-product-check-${productId}`)

            if (found.product.iblockId === catalogIblockId) {
                validProductIds.push(productId)
            }
        }

        await callMethod('crm.deal.update', {
            id: DEAL_ID,
            fields: {
                UF_CRM_IB_LIST: elementId,
                UF_CRM_IB_PROD: validProductIds
            }
        }, 'deal-update-bindings')

        const deal = await callMethod('crm.deal.get', { id: DEAL_ID }, 'deal-get')

        const boundElements = await callMethod('lists.element.get', {
            IBLOCK_TYPE_ID: LIST_IBLOCK_TYPE,
            IBLOCK_ID: listIblockId,
            ELEMENT_ID: Number(deal.UF_CRM_IB_LIST)
        }, 'lists-element-resolve')

        const boundProducts = []

        for (const productId of deal.UF_CRM_IB_PROD ?? []) {
            const found = await callMethod('catalog.product.get', { id: productId }, `catalog-product-resolve-${productId}`)

            boundProducts.push({ id: found.product.id, name: found.product.name })
        }

        console.log(boundElements[0]?.NAME)
        console.table(boundProducts)
    }

    main().catch((error) => console.error(error.message))
    ```

- PHP

    ```php
    <?php

    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Psr\Log\NullLogger;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    const LIST_IBLOCK_TYPE = 'lists';
    const DEAL_ID = 8415;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook(getenv('B24_HOOK'));
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    // Типизированных оберток для методов списков и каталога в SDK нет, вызываем их через ядро SDK
    function callMethod($serviceBuilder, string $method, array $params = []): mixed
    {
        return $serviceBuilder
            ->core
            ->call($method, $params)
            ->getResponseData()
            ->getResult();
    }

    $lists = callMethod($serviceBuilder, 'lists.get', ['IBLOCK_TYPE_ID' => LIST_IBLOCK_TYPE]);
    $catalogs = callMethod($serviceBuilder, 'catalog.catalog.list');

    $listIblockId = (int)$lists[0]['ID'];
    $catalogIblockId = 0;

    foreach ($catalogs['catalogs'] as $catalog) {
        if ($catalog['productIblockId'] === null) {
            $catalogIblockId = (int)$catalog['iblockId'];
            break;
        }
    }

    callMethod($serviceBuilder, 'crm.deal.userfield.add', [
        'fields' => [
            'FIELD_NAME' => 'UF_CRM_IB_LIST',
            'USER_TYPE_ID' => 'iblock_element',
            'MULTIPLE' => 'N',
            'EDIT_FORM_LABEL' => ['ru' => 'Элемент списка', 'en' => 'List element'],
            'SETTINGS' => ['IBLOCK_ID' => $listIblockId, 'DISPLAY' => 'UI'],
        ],
    ]);

    callMethod($serviceBuilder, 'crm.deal.userfield.add', [
        'fields' => [
            'FIELD_NAME' => 'UF_CRM_IB_PROD',
            'USER_TYPE_ID' => 'iblock_element',
            'MULTIPLE' => 'Y',
            'EDIT_FORM_LABEL' => ['ru' => 'Товары каталога', 'en' => 'Catalog products'],
            'SETTINGS' => ['IBLOCK_ID' => $catalogIblockId, 'DISPLAY' => 'UI'],
        ],
    ]);

    $listElements = callMethod($serviceBuilder, 'lists.element.get', [
        'IBLOCK_TYPE_ID' => LIST_IBLOCK_TYPE,
        'IBLOCK_ID' => $listIblockId,
    ]);

    $products = callMethod($serviceBuilder, 'catalog.product.list', [
        'select' => ['id', 'iblockId', 'name'],
        'filter' => ['iblockId' => $catalogIblockId],
        'start' => 0,
    ]);

    $elementId = (int)$listElements[0]['ID'];
    $validProductIds = [];

    foreach (array_slice($products['products'], 0, 2) as $product) {
        $found = callMethod($serviceBuilder, 'catalog.product.get', ['id' => (int)$product['id']]);

        if ((int)$found['product']['iblockId'] === $catalogIblockId) {
            $validProductIds[] = (int)$product['id'];
        }
    }

    callMethod($serviceBuilder, 'crm.deal.update', [
        'id' => DEAL_ID,
        'fields' => [
            'UF_CRM_IB_LIST' => $elementId,
            'UF_CRM_IB_PROD' => $validProductIds,
        ],
    ]);

    $deal = callMethod($serviceBuilder, 'crm.deal.get', ['id' => DEAL_ID]);

    $boundElements = callMethod($serviceBuilder, 'lists.element.get', [
        'IBLOCK_TYPE_ID' => LIST_IBLOCK_TYPE,
        'IBLOCK_ID' => $listIblockId,
        'ELEMENT_ID' => (int)$deal['UF_CRM_IB_LIST'],
    ]);

    $boundProducts = [];

    foreach ($deal['UF_CRM_IB_PROD'] ?? [] as $productId) {
        $found = callMethod($serviceBuilder, 'catalog.product.get', ['id' => (int)$productId]);

        $boundProducts[] = [
            'id' => $found['product']['id'],
            'name' => $found['product']['name'],
        ];
    }

    print_r($boundElements[0]['NAME'] ?? null);
    print_r($boundProducts);
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook

    LIST_IBLOCK_TYPE = "lists"
    DEAL_ID = 8415

    bitrix_token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token=os.environ["B24_HOOK_TOKEN"],
    )
    # B24_HOOK_TOKEN = 'USER_ID/TOKEN'

    def call_method(method, params=None):
        # Типизированных оберток для методов списков и каталога в SDK нет, вызываем их напрямую
        return bitrix_token.call_method(
            api_method=method,
            params=params or {},
        )["result"]

    lists = call_method("lists.get", {"IBLOCK_TYPE_ID": LIST_IBLOCK_TYPE})
    catalogs = call_method("catalog.catalog.list")

    list_iblock_id = int(lists[0]["ID"])
    catalog_iblock_id = next(
        catalog["iblockId"]
        for catalog in catalogs["catalogs"]
        if catalog["productIblockId"] is None
    )

    call_method(
        "crm.deal.userfield.add",
        {
            "fields": {
                "FIELD_NAME": "UF_CRM_IB_LIST",
                "USER_TYPE_ID": "iblock_element",
                "MULTIPLE": "N",
                "EDIT_FORM_LABEL": {"ru": "Элемент списка", "en": "List element"},
                "SETTINGS": {"IBLOCK_ID": list_iblock_id, "DISPLAY": "UI"},
            },
        },
    )

    call_method(
        "crm.deal.userfield.add",
        {
            "fields": {
                "FIELD_NAME": "UF_CRM_IB_PROD",
                "USER_TYPE_ID": "iblock_element",
                "MULTIPLE": "Y",
                "EDIT_FORM_LABEL": {"ru": "Товары каталога", "en": "Catalog products"},
                "SETTINGS": {"IBLOCK_ID": catalog_iblock_id, "DISPLAY": "UI"},
            },
        },
    )

    list_elements = call_method(
        "lists.element.get",
        {"IBLOCK_TYPE_ID": LIST_IBLOCK_TYPE, "IBLOCK_ID": list_iblock_id},
    )

    products = call_method(
        "catalog.product.list",
        {
            "select": ["id", "iblockId", "name"],
            "filter": {"iblockId": catalog_iblock_id},
            "start": 0,
        },
    )

    element_id = int(list_elements[0]["ID"])
    valid_product_ids = []

    for product in products["products"][:2]:
        found = call_method("catalog.product.get", {"id": product["id"]})

        if found["product"]["iblockId"] == catalog_iblock_id:
            valid_product_ids.append(product["id"])

    call_method(
        "crm.deal.update",
        {
            "id": DEAL_ID,
            "fields": {
                "UF_CRM_IB_LIST": element_id,
                "UF_CRM_IB_PROD": valid_product_ids,
            },
        },
    )

    deal = call_method("crm.deal.get", {"id": DEAL_ID})

    bound_elements = call_method(
        "lists.element.get",
        {
            "IBLOCK_TYPE_ID": LIST_IBLOCK_TYPE,
            "IBLOCK_ID": list_iblock_id,
            "ELEMENT_ID": int(deal["UF_CRM_IB_LIST"] or 0),
        },
    )

    bound_products = []

    for product_id in deal.get("UF_CRM_IB_PROD") or []:
        found = call_method("catalog.product.get", {"id": product_id})
        bound_products.append(
            {"id": found["product"]["id"], "name": found["product"]["name"]}
        )

    print(bound_elements[0]["NAME"] if bound_elements else None)
    print(bound_products)
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./how-to-use-iblock-section-binding-field.md)
- [{#T}](../../../api-reference/crm/universal/user-defined-fields/crm-userfield-types.md)
- [{#T}](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md)
- [{#T}](../../../api-reference/lists/lists/lists-get.md)
- [{#T}](../../../api-reference/lists/elements/lists-element-get.md)
- [{#T}](../../../api-reference/catalog/catalog/catalog-catalog-list.md)
- [{#T}](../../../api-reference/catalog/product/catalog-product-list.md)
- [{#T}](../../../api-reference/crm/deals/crm-deal-update.md)
