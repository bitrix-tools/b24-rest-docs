# Как работать с полем Привязка к разделам инфоблоков

> Scope: [`crm`, `lists`, `catalog`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: права разных модулей складываются, нужны все перечисленные
>
> - [crm.deal.userfield.add](../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md) — администратор CRM
> - [crm.deal.update](../../api-reference/crm/deals/crm-deal-update.md) и [crm.deal.get](../../api-reference/crm/deals/crm-deal-get.md) — пользователь с правом «изменения» и «чтения» сделок
> - [lists.get](../../api-reference/lists/lists/lists-get.md) и [lists.section.get](../../api-reference/lists/sections/lists-section-get.md) — пользователь с правом «Чтение» для нужного списка
> - [lists.section.add](../../api-reference/lists/sections/lists-section-add.md) — пользователь с правом «Изменение» для нужного списка
> - [catalog.catalog.list](../../api-reference/catalog/catalog/catalog-catalog-list.md) и [catalog.section.list](../../api-reference/catalog/section/catalog-section-list.md) — администратор

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Поле «Привязка к разделам инфоблоков» хранит идентификаторы разделов: папок списка или разделов товарного каталога. В ответе методов такое поле выглядит как число `237` или массив чисел `[19, 33]`, названий разделов там нет.

Раздел — это узел дерева. У него есть родитель и уровень вложенности, а привязка хранит только сам узел: вложенные в него разделы в значение не попадают. Если нужны и дочерние разделы, соберите их сами по идентификатору родителя.

Поле привязывается к одному инфоблоку через настройку `IBLOCK_ID`, поэтому идентификатор инфоблока нужно получить заранее: для списков — методами группы `lists.*`, для каталога — методами группы `catalog.*`.

Разберем на примере сделок. Заведем два поля: одиночное со ссылкой на раздел списка и множественное со ссылкой на разделы каталога. Заполним их в конкретной сделке, прочитаем обратно и развернем идентификаторы в названия разделов.

Сценарий состоит из пяти шагов.

1. Найдем инфоблок методами [lists.get](../../api-reference/lists/lists/lists-get.md) и [catalog.catalog.list](../../api-reference/catalog/catalog/catalog-catalog-list.md)
2. Создадим поля привязки методом [crm.deal.userfield.add](../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md)
3. Получим идентификаторы разделов методами [lists.section.get](../../api-reference/lists/sections/lists-section-get.md) и [catalog.section.list](../../api-reference/catalog/section/catalog-section-list.md)
4. Запишем значения методом [crm.deal.update](../../api-reference/crm/deals/crm-deal-update.md)
5. Развернем значения в названия методами [crm.deal.get](../../api-reference/crm/deals/crm-deal-get.md), [lists.section.get](../../api-reference/lists/sections/lists-section-get.md) и [catalog.section.list](../../api-reference/catalog/section/catalog-section-list.md)

В результате в сделке будут заполнены оба поля, а по сохраненным идентификаторам вы получите названия разделов.

## Что нужно до начала

Подготовьте данные сценария:

- **Инфоблок, к которому привязываем.** Это список Битрикс24 или товарный каталог. Его идентификатор получим на первом шаге
- **Разделы в этом инфоблоке.** В списке их может не быть: тогда [lists.section.get](../../api-reference/lists/sections/lists-section-get.md) вернет пустой массив, а разделы придется создать
- **Сделка, в которой заполним поля.** Понадобится ее `id`. Сами поля создаются сразу для всех сделок, а не для одной
- **Доступ к REST.** Вебхук или приложение со scope `crm`, `lists` и `catalog`. Поля создает только администратор CRM, разделы каталога тоже доступны только администратору

Вебхук выполняет запросы с правами создавшего его пользователя. Если у этого пользователя нет доступа к списку или к каталогу, методы вернут ошибку доступа, хотя сами методы вызваны верно.

Дальше в примерах используем список с идентификатором `123`, товарный каталог с идентификатором `25` и сделку `8419`. В вашем Битрикс24 эти значения будут другими: идентификаторы инфоблоков возьмите из ответов первого шага, идентификатор сделки — из своей сделки.

Для серверных JS-примеров с `B24Hook` нужен Node.js 18, 20, 22 или новее, для новых проектов — 22 или новее. B24JsSDK — ES module: сохраните код в файле `.mjs` или добавьте `"type": "module"` в `package.json`. Для примеров с b24pysdk нужен Python 3.9 или новее.

Храните путь вебхука в переменной окружения и не публикуйте его в открытом коде.

{% include [Сноска о примерах](../../_includes/examples.md) %}

## 1. Найдем инфоблок и его идентификатор

Метод [lists.get](../../api-reference/lists/lists/lists-get.md) возвращает списки одного типа. Передайте параметр:

- `IBLOCK_TYPE_ID` — тип инфоблока. `lists` — обычные списки, `bitrix_processes` — списки процессов

Метод [catalog.catalog.list](../../api-reference/catalog/catalog/catalog-catalog-list.md) возвращает торговые каталоги без параметров.

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

Сокращенный ответ [lists.get](../../api-reference/lists/lists/lists-get.md):

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

Сокращенный ответ [catalog.catalog.list](../../api-reference/catalog/catalog/catalog-catalog-list.md):

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

Каталог с заполненным `productIblockId` — это инфоблок торговых предложений. Для сценария берем каталог с `productIblockId: null`, в примере это `25`.

## 2. Создадим поля привязки

Метод [crm.deal.userfield.add](../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md) создает пользовательское поле для всех сделок. Передайте параметры:

- `FIELD_NAME` — код поля. Параметр обязательный. Если код не начинается с `UF_CRM_`, префикс добавится автоматически
- `USER_TYPE_ID` — тип поля, для привязки к разделам это `iblock_section`
- `MULTIPLE` — `Y` для нескольких значений, `N` для одного
- `EDIT_FORM_LABEL` — название поля в карточке, по языкам
- `SETTINGS.IBLOCK_ID` — идентификатор инфоблока с первого шага. Без него метод вернет ошибку
- `SETTINGS.DISPLAY` — вид элемента управления в карточке: `UI`, `DIALOG`, `LIST` или `CHECKBOX`

Полный список типов полей возвращает метод [crm.userfield.types](../../api-reference/crm/universal/user-defined-fields/crm-userfield-types.md). Для привязки к отдельным элементам инфоблока есть парный тип `iblock_element`.

В ответе сохраните идентификаторы созданных полей: по ним можно прочитать настройки методом [crm.deal.userfield.get](../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-get.md).

{% list tabs %}

- JS

    ```js
    const listFieldId = await callMethod(
        'crm.deal.userfield.add',
        {
            fields: {
                FIELD_NAME: 'UF_CRM_IBS_LIST',
                USER_TYPE_ID: 'iblock_section',
                MULTIPLE: 'N',
                EDIT_FORM_LABEL: { ru: 'Раздел списка', en: 'List section' },
                SETTINGS: { IBLOCK_ID: 123, DISPLAY: 'UI' }
            }
        },
        'userfield-add-list-section'
    )

    const catalogFieldId = await callMethod(
        'crm.deal.userfield.add',
        {
            fields: {
                FIELD_NAME: 'UF_CRM_IBS_CAT',
                USER_TYPE_ID: 'iblock_section',
                MULTIPLE: 'Y',
                EDIT_FORM_LABEL: { ru: 'Разделы каталога', en: 'Catalog sections' },
                SETTINGS: { IBLOCK_ID: 25, DISPLAY: 'UI' }
            }
        },
        'userfield-add-catalog-section'
    )

    console.log(listFieldId, catalogFieldId)
    ```

- PHP

    ```php
    $listFieldId = callMethod($serviceBuilder, 'crm.deal.userfield.add', [
        'fields' => [
            'FIELD_NAME' => 'UF_CRM_IBS_LIST',
            'USER_TYPE_ID' => 'iblock_section',
            'MULTIPLE' => 'N',
            'EDIT_FORM_LABEL' => ['ru' => 'Раздел списка', 'en' => 'List section'],
            'SETTINGS' => ['IBLOCK_ID' => 123, 'DISPLAY' => 'UI'],
        ],
    ]);

    $catalogFieldId = callMethod($serviceBuilder, 'crm.deal.userfield.add', [
        'fields' => [
            'FIELD_NAME' => 'UF_CRM_IBS_CAT',
            'USER_TYPE_ID' => 'iblock_section',
            'MULTIPLE' => 'Y',
            'EDIT_FORM_LABEL' => ['ru' => 'Разделы каталога', 'en' => 'Catalog sections'],
            'SETTINGS' => ['IBLOCK_ID' => 25, 'DISPLAY' => 'UI'],
        ],
    ]);

    print_r([$listFieldId, $catalogFieldId]);
    ```

- Python

    ```python
    list_field_id = call_method(
        "crm.deal.userfield.add",
        {
            "fields": {
                "FIELD_NAME": "UF_CRM_IBS_LIST",
                "USER_TYPE_ID": "iblock_section",
                "MULTIPLE": "N",
                "EDIT_FORM_LABEL": {"ru": "Раздел списка", "en": "List section"},
                "SETTINGS": {"IBLOCK_ID": 123, "DISPLAY": "UI"},
            },
        },
    )

    catalog_field_id = call_method(
        "crm.deal.userfield.add",
        {
            "fields": {
                "FIELD_NAME": "UF_CRM_IBS_CAT",
                "USER_TYPE_ID": "iblock_section",
                "MULTIPLE": "Y",
                "EDIT_FORM_LABEL": {"ru": "Разделы каталога", "en": "Catalog sections"},
                "SETTINGS": {"IBLOCK_ID": 25, "DISPLAY": "UI"},
            },
        },
    )

    print(list_field_id, catalog_field_id)
    ```

{% endlist %}

Ответ содержит идентификатор поля:

```json
{
    "result": 6007773
}
```

Сокращенный ответ [crm.deal.userfield.get](../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-get.md) с настройками поля:

```json
{
    "result": {
        "ID": "6007773",
        "ENTITY_ID": "CRM_DEAL",
        "FIELD_NAME": "UF_CRM_IBS_LIST",
        "USER_TYPE_ID": "iblock_section",
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

Сохраняются только пять настроек. Значение `FIELD_NAME` понадобится на четвертом шаге — под этим ключом записываются значения.

## 3. Получим идентификаторы разделов

Разделы списка возвращает метод [lists.section.get](../../api-reference/lists/sections/lists-section-get.md). Передайте параметры:

- `IBLOCK_TYPE_ID` — тип инфоблока, тот же, что на первом шаге
- `IBLOCK_ID` — идентификатор списка
- `FILTER` — условия отбора, например `ID` конкретного раздела

Разделы каталога возвращает метод [catalog.section.list](../../api-reference/catalog/section/catalog-section-list.md). Передайте параметры:

- `filter.iblockId` — идентификатор каталога, иначе в ответ попадут разделы всех каталогов
- `select` — поля раздела, для сценария достаточно `id`, `iblockId`, `name` и `iblockSectionId`

Оба метода возвращают плоский список разделов, а дерево строится по ссылке на родителя: `IBLOCK_SECTION_ID` у списка и `iblockSectionId` у каталога. У корневых разделов это поле пустое.

Если список только создан, разделов в нем нет и метод вернет пустой массив. Раздел заводит метод [lists.section.add](../../api-reference/lists/sections/lists-section-add.md) с обязательными параметрами `IBLOCK_TYPE_ID`, `IBLOCK_ID`, `SECTION_CODE` и `FIELDS.NAME`.

{% list tabs %}

- JS

    ```js
    let listSections = await callMethod(
        'lists.section.get',
        {
            IBLOCK_TYPE_ID: 'lists',
            IBLOCK_ID: 123
        },
        'lists-section-get'
    )

    if (listSections.length === 0) {
        await callMethod(
            'lists.section.add',
            {
                IBLOCK_TYPE_ID: 'lists',
                IBLOCK_ID: 123,
                SECTION_CODE: 'first_section',
                FIELDS: { NAME: 'Первый раздел' }
            },
            'lists-section-add'
        )

        listSections = await callMethod(
            'lists.section.get',
            {
                IBLOCK_TYPE_ID: 'lists',
                IBLOCK_ID: 123
            },
            'lists-section-get-again'
        )
    }

    const catalogSections = await callMethod(
        'catalog.section.list',
        {
            select: ['id', 'iblockId', 'name', 'iblockSectionId'],
            filter: { iblockId: 25 }
        },
        'catalog-section-list'
    )

    const listSectionId = Number(listSections[0].ID)
    const catalogSectionIds = catalogSections.sections.slice(0, 2).map((section) => section.id)

    console.log(listSectionId, catalogSectionIds)
    ```

- PHP

    ```php
    $listSections = callMethod($serviceBuilder, 'lists.section.get', [
        'IBLOCK_TYPE_ID' => 'lists',
        'IBLOCK_ID' => 123,
    ]);

    if ($listSections === []) {
        callMethod($serviceBuilder, 'lists.section.add', [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => 123,
            'SECTION_CODE' => 'first_section',
            'FIELDS' => ['NAME' => 'Первый раздел'],
        ]);

        $listSections = callMethod($serviceBuilder, 'lists.section.get', [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => 123,
        ]);
    }

    $catalogSections = callMethod($serviceBuilder, 'catalog.section.list', [
        'select' => ['id', 'iblockId', 'name', 'iblockSectionId'],
        'filter' => ['iblockId' => 25],
    ]);

    $listSectionId = (int)$listSections[0]['ID'];
    $catalogSectionIds = array_map(
        static fn(array $section): int => (int)$section['id'],
        array_slice($catalogSections['sections'], 0, 2)
    );

    print_r([$listSectionId, $catalogSectionIds]);
    ```

- Python

    ```python
    list_sections = call_method(
        "lists.section.get",
        {"IBLOCK_TYPE_ID": "lists", "IBLOCK_ID": 123},
    )

    if not list_sections:
        call_method(
            "lists.section.add",
            {
                "IBLOCK_TYPE_ID": "lists",
                "IBLOCK_ID": 123,
                "SECTION_CODE": "first_section",
                "FIELDS": {"NAME": "Первый раздел"},
            },
        )

        list_sections = call_method(
            "lists.section.get",
            {"IBLOCK_TYPE_ID": "lists", "IBLOCK_ID": 123},
        )

    catalog_sections = call_method(
        "catalog.section.list",
        {
            "select": ["id", "iblockId", "name", "iblockSectionId"],
            "filter": {"iblockId": 25},
        },
    )

    list_section_id = int(list_sections[0]["ID"])
    catalog_section_ids = [
        section["id"] for section in catalog_sections["sections"][:2]
    ]

    print(list_section_id, catalog_section_ids)
    ```

{% endlist %}

Сокращенный ответ [lists.section.get](../../api-reference/lists/sections/lists-section-get.md):

```json
{
    "result": [
        {
            "ID": "237",
            "IBLOCK_ID": "123",
            "IBLOCK_SECTION_ID": null,
            "NAME": "Раздел для проверки документации",
            "DEPTH_LEVEL": "1",
            "CODE": "doc_check_section_1"
        }
    ],
    "total": 1
}
```

Сокращенный ответ [catalog.section.list](../../api-reference/catalog/section/catalog-section-list.md):

```json
{
    "result": {
        "sections": [
            { "id": 19, "iblockId": 25, "iblockSectionId": 31, "name": "Экскурсии" },
            { "id": 31, "iblockId": 25, "iblockSectionId": null, "name": "Одежда" },
            { "id": 33, "iblockId": 25, "iblockSectionId": 31, "name": "Обувь" }
        ]
    },
    "total": 3
}
```

В примере получили раздел списка `237` и разделы каталога `19` и `33`. Оба раздела каталога вложены в раздел `31`: если привязать сделку к разделу `31`, разделы `19` и `33` в значение поля не попадут.

## 4. Запишем значения

Метод [crm.deal.update](../../api-reference/crm/deals/crm-deal-update.md) записывает значения в поля сделки. Передайте параметры:

- `id` — идентификатор сделки
- `fields` — объект с кодами полей. В одиночное поле передайте число, в множественное — массив чисел

Битрикс24 не проверяет переданные идентификаторы: метод примет и несуществующий раздел, и раздел чужого инфоблока, и вернет `true`. Поэтому проверьте разделы перед записью. Раздел списка ищем методом [lists.section.get](../../api-reference/lists/sections/lists-section-get.md) с фильтром по `ID`: пустой массив означает, что раздела в этом списке нет. Разделы каталога проверяем методом [catalog.section.list](../../api-reference/catalog/section/catalog-section-list.md), передав в фильтр массив идентификаторов — так за один вызов видно, какие из них относятся к нужному каталогу.

{% list tabs %}

- JS

    ```js
    async function isListSectionValid(iblockTypeId, iblockId, id) {
        const found = await callMethod(
            'lists.section.get',
            {
                IBLOCK_TYPE_ID: iblockTypeId,
                IBLOCK_ID: iblockId,
                FILTER: { ID: id }
            },
            `lists-section-check-${id}`
        )

        return found.length > 0
    }

    async function filterCatalogSections(iblockId, ids) {
        if (ids.length === 0) {
            return []
        }

        const found = await callMethod(
            'catalog.section.list',
            {
                select: ['id'],
                filter: { iblockId, id: ids }
            },
            'catalog-section-check'
        )

        return found.sections.map((section) => section.id)
    }

    if (!(await isListSectionValid('lists', 123, listSectionId))) {
        throw new Error(`Раздела ${listSectionId} нет в списке 123`)
    }

    const validCatalogSectionIds = await filterCatalogSections(25, catalogSectionIds)

    await callMethod(
        'crm.deal.update',
        {
            id: 8419,
            fields: {
                UF_CRM_IBS_LIST: listSectionId,
                UF_CRM_IBS_CAT: validCatalogSectionIds
            }
        },
        'deal-update-section-bindings'
    )
    ```

- PHP

    ```php
    function isListSectionValid($serviceBuilder, string $iblockTypeId, int $iblockId, int $id): bool
    {
        $found = callMethod($serviceBuilder, 'lists.section.get', [
            'IBLOCK_TYPE_ID' => $iblockTypeId,
            'IBLOCK_ID' => $iblockId,
            'FILTER' => ['ID' => $id],
        ]);

        return $found !== [];
    }

    function filterCatalogSections($serviceBuilder, int $iblockId, array $ids): array
    {
        if ($ids === []) {
            return [];
        }

        $found = callMethod($serviceBuilder, 'catalog.section.list', [
            'select' => ['id'],
            'filter' => ['iblockId' => $iblockId, 'id' => $ids],
        ]);

        return array_map(
            static fn(array $section): int => (int)$section['id'],
            $found['sections']
        );
    }

    if (!isListSectionValid($serviceBuilder, 'lists', 123, $listSectionId)) {
        throw new RuntimeException('Раздела ' . $listSectionId . ' нет в списке 123');
    }

    $validCatalogSectionIds = filterCatalogSections($serviceBuilder, 25, $catalogSectionIds);

    callMethod($serviceBuilder, 'crm.deal.update', [
        'id' => 8419,
        'fields' => [
            'UF_CRM_IBS_LIST' => $listSectionId,
            'UF_CRM_IBS_CAT' => $validCatalogSectionIds,
        ],
    ]);
    ```

- Python

    ```python
    def is_list_section_valid(iblock_type_id, iblock_id, section):
        found = call_method(
            "lists.section.get",
            {
                "IBLOCK_TYPE_ID": iblock_type_id,
                "IBLOCK_ID": iblock_id,
                "FILTER": {"ID": section},
            },
        )

        return len(found) > 0

    def filter_catalog_sections(iblock_id, ids):
        if not ids:
            return []

        found = call_method(
            "catalog.section.list",
            {
                "select": ["id"],
                "filter": {"iblockId": iblock_id, "id": ids},
            },
        )

        return [section["id"] for section in found["sections"]]

    if not is_list_section_valid("lists", 123, list_section_id):
        raise RuntimeError(f"Раздела {list_section_id} нет в списке 123")

    valid_catalog_section_ids = filter_catalog_sections(25, catalog_section_ids)

    call_method(
        "crm.deal.update",
        {
            "id": 8419,
            "fields": {
                "UF_CRM_IBS_LIST": list_section_id,
                "UF_CRM_IBS_CAT": valid_catalog_section_ids,
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

Метод [crm.deal.get](../../api-reference/crm/deals/crm-deal-get.md) возвращает сделку со всеми пользовательскими полями. Одиночное поле приходит строкой, множественное — массивом чисел.

Названия разделов в сделке не хранятся. Раздел списка получите методом [lists.section.get](../../api-reference/lists/sections/lists-section-get.md) с фильтром по `ID`, разделы каталога — методом [catalog.section.list](../../api-reference/catalog/section/catalog-section-list.md) с массивом идентификаторов в фильтре: все нужные разделы придут одним вызовом.

{% list tabs %}

- JS

    ```js
    const deal = await callMethod('crm.deal.get', { id: 8419 }, 'deal-get')

    const boundListSectionId = Number(deal.UF_CRM_IBS_LIST)
    const boundCatalogSectionIds = deal.UF_CRM_IBS_CAT ?? []

    const listSectionNames = boundListSectionId > 0
        ? await callMethod(
            'lists.section.get',
            {
                IBLOCK_TYPE_ID: 'lists',
                IBLOCK_ID: 123,
                FILTER: { ID: boundListSectionId }
            },
            'lists-section-resolve'
        )
        : []

    const catalogSectionNames = boundCatalogSectionIds.length > 0
        ? await callMethod(
            'catalog.section.list',
            {
                select: ['id', 'name', 'iblockSectionId'],
                filter: { iblockId: 25, id: boundCatalogSectionIds }
            },
            'catalog-section-resolve'
        )
        : { sections: [] }

    console.log(listSectionNames[0]?.NAME)
    console.table(catalogSectionNames.sections)
    ```

- PHP

    ```php
    $deal = callMethod($serviceBuilder, 'crm.deal.get', ['id' => 8419]);

    $boundListSectionId = (int)$deal['UF_CRM_IBS_LIST'];
    $boundCatalogSectionIds = $deal['UF_CRM_IBS_CAT'] ?? [];

    $listSectionNames = $boundListSectionId > 0
        ? callMethod($serviceBuilder, 'lists.section.get', [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => 123,
            'FILTER' => ['ID' => $boundListSectionId],
        ])
        : [];

    $catalogSectionNames = $boundCatalogSectionIds !== []
        ? callMethod($serviceBuilder, 'catalog.section.list', [
            'select' => ['id', 'name', 'iblockSectionId'],
            'filter' => ['iblockId' => 25, 'id' => $boundCatalogSectionIds],
        ])
        : ['sections' => []];

    print_r($listSectionNames[0]['NAME'] ?? null);
    print_r($catalogSectionNames['sections']);
    ```

- Python

    ```python
    deal = call_method("crm.deal.get", {"id": 8419})

    bound_list_section_id = int(deal["UF_CRM_IBS_LIST"] or 0)
    bound_catalog_section_ids = deal.get("UF_CRM_IBS_CAT") or []

    list_section_names = (
        call_method(
            "lists.section.get",
            {
                "IBLOCK_TYPE_ID": "lists",
                "IBLOCK_ID": 123,
                "FILTER": {"ID": bound_list_section_id},
            },
        )
        if bound_list_section_id > 0
        else []
    )

    catalog_section_names = (
        call_method(
            "catalog.section.list",
            {
                "select": ["id", "name", "iblockSectionId"],
                "filter": {"iblockId": 25, "id": bound_catalog_section_ids},
            },
        )
        if bound_catalog_section_ids
        else {"sections": []}
    )

    print(list_section_names[0]["NAME"] if list_section_names else None)
    print(catalog_section_names["sections"])
    ```

{% endlist %}

Сокращенный ответ [crm.deal.get](../../api-reference/crm/deals/crm-deal-get.md):

```json
{
    "result": {
        "ID": "8419",
        "TITLE": "Проверка привязки к разделам инфоблоков",
        "UF_CRM_IBS_LIST": "237",
        "UF_CRM_IBS_CAT": [19, 33]
    }
}
```

Сокращенный ответ [catalog.section.list](../../api-reference/catalog/section/catalog-section-list.md) с фильтром по идентификаторам:

```json
{
    "result": {
        "sections": [
            { "id": 19, "iblockSectionId": 31, "name": "Экскурсии" },
            { "id": 33, "iblockSectionId": 31, "name": "Обувь" }
        ]
    },
    "total": 2
}
```

Если в ответе разделов меньше, чем идентификаторов в поле, часть привязок указывает на разделы, которых нет в этом каталоге.

## Проверим результат

Сценарий выполнен, если после чтения сделки оба поля заполнены и по каждому идентификатору находится раздел.

Что проверить в ответах:

- `UF_CRM_IBS_LIST` содержит строку с идентификатором раздела, а не `"0"` и не пустую строку
- `UF_CRM_IBS_CAT` содержит массив с идентификаторами разделов
- [lists.section.get](../../api-reference/lists/sections/lists-section-get.md) с фильтром по этому `ID` вернул один раздел, а не пустой массив
- [catalog.section.list](../../api-reference/catalog/section/catalog-section-list.md) вернул столько же разделов, сколько идентификаторов в поле

В интерфейсе откройте карточку сделки: в полях «Раздел списка» и «Разделы каталога» будут названия разделов. Пустое поле в карточке при непустом значении в ответе означает, что сохраненного раздела в привязанном инфоблоке нет.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код или текст ошибки** | **Причина и действие** ||
|| `The 'FIELD_NAME' field is not found.` | В [crm.deal.userfield.add](../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md) не передан код поля. Передайте `FIELD_NAME` ||
|| `ERROR_CORE`, `Выберите инфоблок, с которым нужно связать поле` | В настройках поля нет `SETTINGS.IBLOCK_ID`. Передайте идентификатор инфоблока с первого шага ||
|| `0`, `Неверный тип информационного блока.` | [lists.section.get](../../api-reference/lists/sections/lists-section-get.md) вызван с типом инфоблока, который не относится к спискам. Для разделов каталога используйте [catalog.section.list](../../api-reference/catalog/section/catalog-section-list.md) ||
|| `ERROR_REQUIRED_PARAMETERS_MISSING` | В [lists.section.add](../../api-reference/lists/sections/lists-section-add.md) не передан обязательный параметр. Его имя указано в тексте ошибки: `SECTION_CODE` или `NAME` ||
|| `200040300040`, `Access Denied` | [catalog.section.get](../../api-reference/catalog/section/catalog-section-get.md) вызван с идентификатором несуществующего раздела или без прав администратора. Сообщение про доступ приходит в обоих случаях, поэтому проверяйте разделы методом [catalog.section.list](../../api-reference/catalog/section/catalog-section-list.md) ||
|#

Если ошибки не было, а привязка не работает, проверьте сохраненное значение методом [crm.deal.get](../../api-reference/crm/deals/crm-deal-get.md).

- Значение `"0"` означает, что в поле передали строку вместо числа. Нечисловое значение приводится к нулю, ошибку метод не возвращает
- Значение `"1"` в одиночном поле означает, что в него передали массив. Одиночное поле принимает только число, массив приводится к единице, а не к первому элементу
- Значение есть, а в карточке пусто — сохранен идентификатор несуществующего раздела или раздела другого инфоблока. Проверьте раздел методом [lists.section.get](../../api-reference/lists/sections/lists-section-get.md) или [catalog.section.list](../../api-reference/catalog/section/catalog-section-list.md) и запишите значение заново

Чтобы очистить привязку, передайте в поле пустую строку. Повторный запуск сценария перезаписывает значения, дубликаты не создаются.

## Что важно учитывать

- Поле привязано к одному инфоблоку. Тип инфоблока в настройках не хранится, сохраняется только `IBLOCK_ID`
- Битрикс24 не проверяет, что раздел существует и относится к привязанному инфоблоку. Проверка идентификаторов — задача вашей интеграции
- Привязка хранит один узел дерева. Вложенные разделы не подставляются автоматически: чтобы получить ветку целиком, отберите разделы по родителю в `IBLOCK_SECTION_ID` или `iblockSectionId`
- Одиночное поле возвращается строкой, множественное — массивом чисел
- Разделы каталога доступны только администратору, разделы списка — пользователю с правом чтения этого списка
- Для привязки к отдельным элементам инфоблока используйте парный тип поля `iblock_element`, он разобран в туториале [{#T}](./how-to-use-iblock-binding-field.md)
- Для других объектов CRM поля создают одноименными методами, например [crm.lead.userfield.add](../../api-reference/crm/leads/userfield/crm-lead-userfield-add.md), а в смарт-процессе — методом [userfieldconfig.add](../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md)

## Пример кода

Полный сценарий одним скриптом: находит инфоблоки, создает оба поля, получает и проверяет разделы, записывает значения и разворачивает их в названия.

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    const LIST_IBLOCK_TYPE = 'lists'
    const DEAL_ID = 8419

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
        const catalogIblockId = catalogs.catalogs.find((item) => item.productIblockId === null).iblockId

        await callMethod('crm.deal.userfield.add', {
            fields: {
                FIELD_NAME: 'UF_CRM_IBS_LIST',
                USER_TYPE_ID: 'iblock_section',
                MULTIPLE: 'N',
                EDIT_FORM_LABEL: { ru: 'Раздел списка', en: 'List section' },
                SETTINGS: { IBLOCK_ID: listIblockId, DISPLAY: 'UI' }
            }
        }, 'userfield-add-list-section')

        await callMethod('crm.deal.userfield.add', {
            fields: {
                FIELD_NAME: 'UF_CRM_IBS_CAT',
                USER_TYPE_ID: 'iblock_section',
                MULTIPLE: 'Y',
                EDIT_FORM_LABEL: { ru: 'Разделы каталога', en: 'Catalog sections' },
                SETTINGS: { IBLOCK_ID: catalogIblockId, DISPLAY: 'UI' }
            }
        }, 'userfield-add-catalog-section')

        let listSections = await callMethod('lists.section.get', {
            IBLOCK_TYPE_ID: LIST_IBLOCK_TYPE,
            IBLOCK_ID: listIblockId
        }, 'lists-section-get')

        if (listSections.length === 0) {
            await callMethod('lists.section.add', {
                IBLOCK_TYPE_ID: LIST_IBLOCK_TYPE,
                IBLOCK_ID: listIblockId,
                SECTION_CODE: 'first_section',
                FIELDS: { NAME: 'Первый раздел' }
            }, 'lists-section-add')

            listSections = await callMethod('lists.section.get', {
                IBLOCK_TYPE_ID: LIST_IBLOCK_TYPE,
                IBLOCK_ID: listIblockId
            }, 'lists-section-get-again')
        }

        const catalogSections = await callMethod('catalog.section.list', {
            select: ['id', 'iblockId', 'name', 'iblockSectionId'],
            filter: { iblockId: catalogIblockId }
        }, 'catalog-section-list')

        const listSectionId = Number(listSections[0].ID)
        const catalogSectionIds = catalogSections.sections.slice(0, 2).map((section) => section.id)

        const checked = await callMethod('catalog.section.list', {
            select: ['id'],
            filter: { iblockId: catalogIblockId, id: catalogSectionIds }
        }, 'catalog-section-check')

        await callMethod('crm.deal.update', {
            id: DEAL_ID,
            fields: {
                UF_CRM_IBS_LIST: listSectionId,
                UF_CRM_IBS_CAT: checked.sections.map((section) => section.id)
            }
        }, 'deal-update-section-bindings')

        const deal = await callMethod('crm.deal.get', { id: DEAL_ID }, 'deal-get')

        const boundListSection = await callMethod('lists.section.get', {
            IBLOCK_TYPE_ID: LIST_IBLOCK_TYPE,
            IBLOCK_ID: listIblockId,
            FILTER: { ID: Number(deal.UF_CRM_IBS_LIST) }
        }, 'lists-section-resolve')

        const boundCatalogSections = await callMethod('catalog.section.list', {
            select: ['id', 'name', 'iblockSectionId'],
            filter: { iblockId: catalogIblockId, id: deal.UF_CRM_IBS_CAT ?? [] }
        }, 'catalog-section-resolve')

        console.log(boundListSection[0]?.NAME)
        console.table(boundCatalogSections.sections)
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
    const DEAL_ID = 8419;

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
            'FIELD_NAME' => 'UF_CRM_IBS_LIST',
            'USER_TYPE_ID' => 'iblock_section',
            'MULTIPLE' => 'N',
            'EDIT_FORM_LABEL' => ['ru' => 'Раздел списка', 'en' => 'List section'],
            'SETTINGS' => ['IBLOCK_ID' => $listIblockId, 'DISPLAY' => 'UI'],
        ],
    ]);

    callMethod($serviceBuilder, 'crm.deal.userfield.add', [
        'fields' => [
            'FIELD_NAME' => 'UF_CRM_IBS_CAT',
            'USER_TYPE_ID' => 'iblock_section',
            'MULTIPLE' => 'Y',
            'EDIT_FORM_LABEL' => ['ru' => 'Разделы каталога', 'en' => 'Catalog sections'],
            'SETTINGS' => ['IBLOCK_ID' => $catalogIblockId, 'DISPLAY' => 'UI'],
        ],
    ]);

    $listSections = callMethod($serviceBuilder, 'lists.section.get', [
        'IBLOCK_TYPE_ID' => LIST_IBLOCK_TYPE,
        'IBLOCK_ID' => $listIblockId,
    ]);

    if ($listSections === []) {
        callMethod($serviceBuilder, 'lists.section.add', [
            'IBLOCK_TYPE_ID' => LIST_IBLOCK_TYPE,
            'IBLOCK_ID' => $listIblockId,
            'SECTION_CODE' => 'first_section',
            'FIELDS' => ['NAME' => 'Первый раздел'],
        ]);

        $listSections = callMethod($serviceBuilder, 'lists.section.get', [
            'IBLOCK_TYPE_ID' => LIST_IBLOCK_TYPE,
            'IBLOCK_ID' => $listIblockId,
        ]);
    }

    $catalogSections = callMethod($serviceBuilder, 'catalog.section.list', [
        'select' => ['id', 'iblockId', 'name', 'iblockSectionId'],
        'filter' => ['iblockId' => $catalogIblockId],
    ]);

    $listSectionId = (int)$listSections[0]['ID'];
    $catalogSectionIds = array_map(
        static fn(array $section): int => (int)$section['id'],
        array_slice($catalogSections['sections'], 0, 2)
    );

    $checked = callMethod($serviceBuilder, 'catalog.section.list', [
        'select' => ['id'],
        'filter' => ['iblockId' => $catalogIblockId, 'id' => $catalogSectionIds],
    ]);

    callMethod($serviceBuilder, 'crm.deal.update', [
        'id' => DEAL_ID,
        'fields' => [
            'UF_CRM_IBS_LIST' => $listSectionId,
            'UF_CRM_IBS_CAT' => array_map(
                static fn(array $section): int => (int)$section['id'],
                $checked['sections']
            ),
        ],
    ]);

    $deal = callMethod($serviceBuilder, 'crm.deal.get', ['id' => DEAL_ID]);

    $boundListSection = callMethod($serviceBuilder, 'lists.section.get', [
        'IBLOCK_TYPE_ID' => LIST_IBLOCK_TYPE,
        'IBLOCK_ID' => $listIblockId,
        'FILTER' => ['ID' => (int)$deal['UF_CRM_IBS_LIST']],
    ]);

    $boundCatalogSections = callMethod($serviceBuilder, 'catalog.section.list', [
        'select' => ['id', 'name', 'iblockSectionId'],
        'filter' => ['iblockId' => $catalogIblockId, 'id' => $deal['UF_CRM_IBS_CAT'] ?? []],
    ]);

    print_r($boundListSection[0]['NAME'] ?? null);
    print_r($boundCatalogSections['sections']);
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook

    LIST_IBLOCK_TYPE = "lists"
    DEAL_ID = 8419

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
                "FIELD_NAME": "UF_CRM_IBS_LIST",
                "USER_TYPE_ID": "iblock_section",
                "MULTIPLE": "N",
                "EDIT_FORM_LABEL": {"ru": "Раздел списка", "en": "List section"},
                "SETTINGS": {"IBLOCK_ID": list_iblock_id, "DISPLAY": "UI"},
            },
        },
    )

    call_method(
        "crm.deal.userfield.add",
        {
            "fields": {
                "FIELD_NAME": "UF_CRM_IBS_CAT",
                "USER_TYPE_ID": "iblock_section",
                "MULTIPLE": "Y",
                "EDIT_FORM_LABEL": {"ru": "Разделы каталога", "en": "Catalog sections"},
                "SETTINGS": {"IBLOCK_ID": catalog_iblock_id, "DISPLAY": "UI"},
            },
        },
    )

    list_sections = call_method(
        "lists.section.get",
        {"IBLOCK_TYPE_ID": LIST_IBLOCK_TYPE, "IBLOCK_ID": list_iblock_id},
    )

    if not list_sections:
        call_method(
            "lists.section.add",
            {
                "IBLOCK_TYPE_ID": LIST_IBLOCK_TYPE,
                "IBLOCK_ID": list_iblock_id,
                "SECTION_CODE": "first_section",
                "FIELDS": {"NAME": "Первый раздел"},
            },
        )

        list_sections = call_method(
            "lists.section.get",
            {"IBLOCK_TYPE_ID": LIST_IBLOCK_TYPE, "IBLOCK_ID": list_iblock_id},
        )

    catalog_sections = call_method(
        "catalog.section.list",
        {
            "select": ["id", "iblockId", "name", "iblockSectionId"],
            "filter": {"iblockId": catalog_iblock_id},
        },
    )

    list_section_id = int(list_sections[0]["ID"])
    catalog_section_ids = [section["id"] for section in catalog_sections["sections"][:2]]

    checked = call_method(
        "catalog.section.list",
        {
            "select": ["id"],
            "filter": {"iblockId": catalog_iblock_id, "id": catalog_section_ids},
        },
    )

    call_method(
        "crm.deal.update",
        {
            "id": DEAL_ID,
            "fields": {
                "UF_CRM_IBS_LIST": list_section_id,
                "UF_CRM_IBS_CAT": [section["id"] for section in checked["sections"]],
            },
        },
    )

    deal = call_method("crm.deal.get", {"id": DEAL_ID})

    bound_list_section = call_method(
        "lists.section.get",
        {
            "IBLOCK_TYPE_ID": LIST_IBLOCK_TYPE,
            "IBLOCK_ID": list_iblock_id,
            "FILTER": {"ID": int(deal["UF_CRM_IBS_LIST"] or 0)},
        },
    )

    bound_catalog_sections = call_method(
        "catalog.section.list",
        {
            "select": ["id", "name", "iblockSectionId"],
            "filter": {
                "iblockId": catalog_iblock_id,
                "id": deal.get("UF_CRM_IBS_CAT") or [],
            },
        },
    )

    print(bound_list_section[0]["NAME"] if bound_list_section else None)
    print(bound_catalog_sections["sections"])
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./how-to-use-iblock-binding-field.md)
- [{#T}](../../api-reference/crm/universal/user-defined-fields/crm-userfield-types.md)
- [{#T}](../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md)
- [{#T}](../../api-reference/lists/sections/lists-section-get.md)
- [{#T}](../../api-reference/lists/sections/lists-section-add.md)
- [{#T}](../../api-reference/catalog/section/catalog-section-list.md)
- [{#T}](../../api-reference/catalog/catalog/catalog-catalog-list.md)
- [{#T}](../../api-reference/crm/deals/crm-deal-update.md)
