# Как получить список поставщиков

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — на чтение контактов или компаний в CRM
>
> - [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) — пользователь с правом на чтение элементов объекта CRM
> - [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) — любой пользователь

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Отдельного объекта «поставщик» в CRM нет. Поставщики — это контакты и компании из системной воронки с особым кодом:

- `CATALOG_CONTRACTOR_CONTACT` — для контакта

- `CATALOG_CONTRACTOR_COMPANY` — для компании

Идентификатор этой воронки на каждом Битрикс24 свой, записать его в код константой нельзя. Поэтому сначала запросим идентификатор по коду воронки, а потом отфильтруем по нему элементы.

В результате сценария получим список поставщиков с их идентификаторами. Эти идентификаторы принимают методы складского учета — например, [catalog.documentcontractor.add](../../../api-reference/catalog/documentcontractor/catalog-documentcontractor-add.md) привязывает поставщика к складскому документу.

Сценарий состоит из двух шагов.

1. Получить `id` системной воронки поставщиков методом [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md)
2. Получить элементы этой воронки методом [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md)

## Что нужно до начала

- вебхук создан от имени пользователя с правом читать контакты и компании в CRM

- в правах вебхука отмечен scope `crm`

- в Битрикс24 включен складской учет: системные воронки поставщиков создаются вместе с ним

- у пользователя вебхука есть доступ к воронке поставщиков. Шаг 1 возвращает только те воронки, которые пользователю разрешено читать, а шаг 2 — только видимые ему элементы

- путь вебхука дает полный доступ в рамках своего scope. Храните путь в переменной окружения и не публикуйте его в открытом коде

- вы решили, кого получаете: контактов или компании

#|
|| **Что передаем** | **Контакт** | **Компания** ||
|| `entityTypeId` | `3` | `4` ||
|| Код системной воронки | `CATALOG_CONTRACTOR_CONTACT` | `CATALOG_CONTRACTOR_COMPANY` ||
|| Поля названия в `select` | `name` и `lastName` | `title` ||
|#

Дальше в примерах запрашиваются контакты. Что заменить для компаний, описано в блоке [Что важно учитывать](#company).

## 1. Получим идентификатор воронки поставщиков

Используем метод [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) с параметрами:

- `entityTypeId` — идентификатор [типа объекта CRM](../../../api-reference/crm/data-types.md#object_type), обязательный параметр. Укажем `3` — контакт

- `filter[code]` — фильтр по коду воронки. Укажем `CATALOG_CONTRACTOR_CONTACT`. Без фильтра метод вернет все воронки контактов, включая общую

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const result = await $b24.actions.v2.call.make({
        method: 'crm.category.list',
        params: {
            entityTypeId: 3,
            filter: {
                code: 'CATALOG_CONTRACTOR_CONTACT'
            }
        }
    });

    console.log(result.getData().result);
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    # обертка b24pysdk принимает только entity_type_id, поэтому отбираем воронку по коду в ответе
    result = client.crm.category.list(
        entity_type_id=3,  # 3 — контакт
    ).response.result
    categories = [
        category
        for category in result.get("categories", [])
        if category.get("code") == "CATALOG_CONTRACTOR_CONTACT"
    ]
    print(categories)
    ```


- PHP

    ```php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $logger = new Logger('b24');
    $logger->pushHandler(new StreamHandler('php://stdout'));

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $logger))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    // у crm.category.list нет обертки в SDK — вызываем метод напрямую
    $result = $serviceBuilder->core->call(
        'crm.category.list',
        [
            'entityTypeId' => 3, // 3 — контакт
            'filter' => [
                'code' => 'CATALOG_CONTRACTOR_CONTACT' // Код системной воронки поставщиков
            ]
        ]
    );
    ```
{% endlist %}

В результате получим идентификатор воронки. В примере `id`: `15`. На вашем Битрикс24 значение будет другим — не переносите `15` в рабочий код, запрашивайте идентификатор этим шагом.

```json
{
  "result": {
    "categories": [
      {
        "id": 15,
        "name": "Контакты поставщика",
        "sort": 500,
        "entityTypeId": 3,
        "isDefault": "N",
        "isSystem": "Y",
        "code": "CATALOG_CONTRACTOR_CONTACT"
      }
    ]
  },
  "total": 1
}
```

Признак `isSystem`: `Y` подтверждает, что воронку создала система, а не пользователь. Сохраним `id` первого элемента массива `categories` — на шаге 2 он станет значением фильтра `categoryId`.

{% note warning "" %}

До вызова шага 2 проверьте, что массив `categories` не пустой. Если передать в фильтр `categoryId`: `null`, метод [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) вернет не поставщиков, а контакты из общей воронки.

{% endnote %}

## 2. Получим список поставщиков

Отфильтруем элементы методом [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) с параметрами:

- `entityTypeId` — идентификатор [типа объекта CRM](../../../api-reference/crm/data-types.md#object_type), обязательный параметр. Укажем `3` — контакт

- `filter[categoryId]` — идентификатор системной воронки из шага 1. В примере `15`

- `select` — список полей для вывода. Укажем `id`, `name`, `lastName` и `categoryId`. Полный набор полей объекта возвращает метод [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) с тем же `entityTypeId`

{% list tabs %}

- JS

    ```javascript
    const result = await $b24.actions.v2.call.make({
        method: 'crm.item.list',
        params: {
            entityTypeId: 3,
            select: ['id', 'name', 'lastName', 'categoryId'],
            filter: {
                categoryId: 15
            }
        }
    });

    console.log(result.getData().result);
    ```

- Python

    ```python
    result = client.crm.item.list(
        entity_type_id=3,
        select=["id", "name", "lastName", "categoryId"],
        filter={
            "categoryId": 15,
        },
    ).response.result
    ```


- PHP

    ```php
    $result = $serviceBuilder->getCRMScope()->item()->list(
        3,
        [],
        [
            'categoryId' => 15
        ],
        ['id', 'name', 'lastName', 'categoryId']
    );
    ```
{% endlist %}

В результате получим список контактов-поставщиков.

```json
{
  "result": {
    "items": [
      {
        "id": 2185,
        "name": "Сергей",
        "lastName": null,
        "categoryId": 15
      },
      {
        "id": 2443,
        "name": "Иван",
        "lastName": "Иванов",
        "categoryId": 15
      }
    ]
  },
  "total": 2
}
```

Поле `lastName` может быть пустым: у контакта обязательно только имя. При выводе списка склеивайте `name` и `lastName` через пробел и убирайте лишние пробелы.

## Проверим результат

Сценарий выполнен, если у каждого элемента массива `items` поле `categoryId` совпадает с `id` воронки из шага 1.

- поле `total` показывает, сколько поставщиков нашлось всего. За один вызов метод возвращает не больше 50 элементов. Если `total` больше 50, в ответе только первая страница — остальные получите повторными вызовами с параметром `start`: `50`, `100` и так далее

- в интерфейсе тот же список открывается в разделе CRM → Контакты. Переключитесь на воронку с названием из поля `name` шага 1 — по умолчанию это «Контакты поставщика». Количество элементов в ней совпадет с `total`

Если `total` равен нулю, метод отработал верно, а поставщиков в Битрикс24 нет. Создать поставщика можно по сценарию [Как создать поставщика в CRM](../how-to-add-crm-objects/how-to-add-contractor.md).

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `NOT_FOUND` | Передан `entityTypeId`, которому не соответствует ни один объект CRM. Для контактов нужно `3`, для компаний — `4` ||
|| `ENTITY_TYPE_NOT_SUPPORTED` | На шаге 1 передан объект CRM, у которого нет воронок. Поставщики бывают только у контактов и компаний ||
|| `INVALID_ARG_VALUE` `Invalid filter: field 'field' is not allowed in filter` | На шаге 2 в `filter` передано поле, по которому фильтровать нельзя. Список доступных полей возвращает метод [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) ||
|| `allowed_only_intranet_user` | Вебхук создан от имени внешнего пользователя. Сценарий доступен только сотрудникам Битрикс24 ||
|#

Пустой массив `categories` на шаге 1 — не ошибка метода. Причин две:

- в Битрикс24 не включен складской учет, поэтому системных воронок поставщиков нет

- у пользователя вебхука нет доступа к воронке поставщиков

Чтобы различить причины, выполните шаг 1 вебхуком администратора. Если администратор воронку видит, а исходный вебхук нет, дело в правах его пользователя. Если не видит и администратор, складской учет не включен.

Пустой массив `items` на шаге 2 при непустом шаге 1 означает, что в воронке нет видимых пользователю элементов. Проверьте, что `categoryId` взят из ответа шага 1, а не записан в код числом с другого Битрикс24.

Оба метода только читают данные, поэтому после ошибки сценарий можно повторить с любого шага.

## Что важно учитывать {#company}

- чтобы получить компании-поставщиков, замените `entityTypeId` на `4`, код воронки — на `CATALOG_CONTRACTOR_COMPANY`, а поля `name` и `lastName` в `select` — на `title`. Менять `entityTypeId` и код воронки нужно вместе: с `entityTypeId`: `4` код контактов вернет пустой массив `categories`

- контакты и компании — разные объекты CRM, одним вызовом их не получить. Чтобы собрать общий список поставщиков, выполните сценарий дважды и объедините результаты в своем коде

- воронку поставщиков нельзя создать или удалить через REST: [crm.category.add](../../../api-reference/crm/universal/category/crm-category-add.md) запрещает добавление системных воронок, а [crm.category.delete](../../../api-reference/crm/universal/category/crm-category-delete.md) отвечает на удаление ошибкой `REMOVING_DISABLED`

## Пример кода

Код проходит оба шага и выводит список поставщиков. Заменить нужно путь вебхука, а для компаний — значения `entityTypeId` и кода воронки в первых строках примера.

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const entityTypeId = 3; // 3 — контакт; для компании укажите 4
    const categoryCode = 'CATALOG_CONTRACTOR_CONTACT'; // для компании укажите CATALOG_CONTRACTOR_COMPANY

    const resultCategory = await $b24.actions.v2.call.make({
        method: 'crm.category.list',
        params: {
            entityTypeId: entityTypeId,
            filter: { code: categoryCode }
        }
    });

    if (!resultCategory.isSuccess) {
        console.error(resultCategory.getErrorMessages().join('; '));
    } else {
        const categories = resultCategory.getData().result.categories || [];
        if (!categories.length) {
            console.error('Воронка поставщиков не найдена');
        } else {
            const categoryId = categories[0].id;

            const resultItems = await $b24.actions.v2.call.make({
                method: 'crm.item.list',
                params: {
                    entityTypeId: entityTypeId,
                    select: ['id', 'name', 'lastName', 'categoryId'],
                    filter: { categoryId: categoryId },
                    order: { id: 'DESC' }
                }
            });

            if (!resultItems.isSuccess) {
                console.error(resultItems.getErrorMessages().join('; '));
            } else {
                console.log(resultItems.getData().result);
            }
        }
    }
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    entity_type_id = 3  # 3 — контакт; для компании укажите 4

    category_code = (
        "CATALOG_CONTRACTOR_CONTACT"
        if entity_type_id == 3
        else "CATALOG_CONTRACTOR_COMPANY"
    )

    try:
        categories_response = client.crm.category.list(
            entity_type_id=entity_type_id,
        ).response.result.get("categories", [])
        categories = [
            category
            for category in categories_response
            if category.get("code") == category_code
        ]
    except BitrixAPIError as error:
        print(error)
    else:
        if not categories:
            print("Воронка поставщиков не найдена")
        else:
            try:
                items_result = client.crm.item.list(
                    entity_type_id=entity_type_id,
                    select=["id", "name", "lastName", "categoryId"],
                    filter={"categoryId": categories[0]["id"]},
                    order={"id": "DESC"},
                ).response.result
            except BitrixAPIError as error:
                print(error)
            else:
                print(items_result)
    ```


- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $logger = new Logger('b24');
    $logger->pushHandler(new StreamHandler('php://stdout'));

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $logger))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $entityTypeId = 3; // 3 — контакт; для компании укажите 4
    $categoryCode = 'CATALOG_CONTRACTOR_CONTACT'; // для компании укажите CATALOG_CONTRACTOR_COMPANY

    try {
        $resultCategory = $serviceBuilder->core->call(
            'crm.category.list',
            [
                'entityTypeId' => $entityTypeId,
                'filter' => [
                    'code' => $categoryCode
                ]
            ]
        );

        $categories = $resultCategory->getResponseData()->getResult()['categories'] ?? [];
        if (empty($categories)) {
            echo 'Воронка поставщиков не найдена';
            return;
        }

        $categoryId = $categories[0]['id'];

        $resultItems = $serviceBuilder->getCRMScope()->item()->list(
            $entityTypeId,
            [
                'id' => 'DESC'
            ],
            [
                'categoryId' => $categoryId
            ],
            ['id', 'name', 'lastName', 'categoryId']
        );

        print_r($resultItems->getItems());
    } catch (\Throwable $e) {
        echo $e->getMessage();
    }
    ```
{% endlist %}

## Продолжите изучение

- [{#T}](../../../api-reference/crm/universal/crm-item-list.md)
- [{#T}](../../../api-reference/crm/universal/category/crm-category-list.md)
- [{#T}](../how-to-add-crm-objects/how-to-add-contractor.md)
- [{#T}](../../../api-reference/catalog/documentcontractor/catalog-documentcontractor-add.md)
- [{#T}](./how-to-get-elements-by-stage-filter.md)
