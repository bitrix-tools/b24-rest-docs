# Как получить воронки сделок со стадиями и семантикой

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь с доступом к CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Воронки сделок помогают разделить разные процессы продаж: новые продажи, продление договора, работу с партнерами или отдельные направления бизнеса. У каждой воронки свой набор стадий. У каждой стадии есть семантика — состояние сделки: в работе, успешно завершена или неуспешно завершена.

Семантика нужна для отчетов, автоматизации и фильтрации сделок. Например, по ней можно отделить активные сделки от выигранных и проигранных, даже если названия стадий отличаются в разных воронках.

В результате вы получите таблицу для каждой воронки сделок. В строках таблицы будут стадии, их названия и семантика.

Чтобы получить воронки сделок со стадиями и семантикой, вызываем последовательно два метода:

1. [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) — получаем массив `categories` с воронками сделок и берем из него `id` и `name`
2. [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) — для каждой воронки передаем код стадий в `filter.ENTITY_ID` и получаем стадии

Данные переходят между методами так:

- `id` воронки из `categories` определяет код стадий
- для основной воронки с `id = 0` используем код `DEAL_STAGE`
- для дополнительной воронки с `id > 0` используем код `DEAL_STAGE_{id}`
- сформированный код передаем в `filter.ENTITY_ID` метода [crm.status.list](../../../api-reference/crm/status/crm-status-list.md)

## 1\. Получаем список воронок сделок

Вызываем метод [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) с параметром `entityTypeId: 2`, где `2` — идентификатор типа объекта `сделка`. Идентификаторы типов объектов CRM можно получить методом [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md).

Список воронок фильтруется по правам доступа пользователя. Если пользователь не может читать определенную воронку, метод не вернет ее в ответе.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    const categoryResponse = await $b24.actions.v2.call.make({
        method: 'crm.category.list',
        params: {
            entityTypeId: 2,
        },
        requestId: 'category-list',
    })

    if (!categoryResponse.isSuccess) {
        throw new Error(categoryResponse.getErrorMessages().join('; '))
    }

    const arCategory = categoryResponse.getData().result.categories.reduce((acc, item) => {
        acc[item.id] = item.name
        return acc
    }, {})
    ```

- PHP

    ```php
    // crm.category.list не имеет типизированной обертки — вызываем через core
    $result = $sb->core->call('crm.category.list', ['entityTypeId' => 2])
        ->getResponseData()
        ->getResult();

    $arCategory = array_column($result['categories'] ?? [], 'name', 'id');
    ```

- Python

    ```python
    categories = client.crm.category.list(entity_type_id=2).response.result.get("categories", [])
    category_map = {item["id"]: item["name"] for item in categories}
    ```

{% endlist %}

В ответе метод возвращает массив `categories` с доступными пользователю воронками сделок, включая основную. У каждой воронки есть `id` — идентификатор воронки, `name` — название, `isDefault` — признак основной воронки.

```json
{
    "result": {
        "categories": [
            {
                "id": 0,
                "name": "Общая",
                "sort": 100,
                "entityTypeId": 2,
                "isDefault": "Y"
            },
            {
                "id": 7,
                "name": "Продление договора",
                "sort": 200,
                "entityTypeId": 2,
                "isDefault": "N"
            }
        ]
    },
    "total": 2
}
```

Поле `total` показывает общее количество найденных воронок. Метод возвращает одну страницу ответа — до 50 записей. Примеры выше обрабатывают полученные в ответе элементы.

## 2\. Получаем стадии и семантику для каждой воронки

Метод [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) получает стадии по фильтру `ENTITY_ID`. Для сделок код стадий зависит от воронки:

- `DEAL_STAGE` — стадии основной воронки
- `DEAL_STAGE_{id}` — стадии дополнительной воронки, где `{id}` — идентификатор воронки

Берем поле `id` из ответа [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md), формируем `ENTITY_ID` и вызываем [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) с сортировкой по `SORT`. Например, для воронки с идентификатором `7` нужно передать `DEAL_STAGE_7`.

В ответе используем поля:

- `STATUS_ID` — идентификатор стадии
- `NAME` — название стадии
- `EXTRA.SEMANTICS` — семантика стадии
- `EXTRA.COLOR` — цвет стадии

Значение `EXTRA.SEMANTICS` показывает группу стадии:

- `process` — сделка находится в работе
- `success` — сделка успешно завершена
- `failure` — сделка завершена неуспешно
- `apology` — отдельная группа неуспешно завершенных стадий

В примерах ниже используются данные, полученные на предыдущем шаге.

{% list tabs %}

- JS

    ```js
    for (const [id, name] of Object.entries(arCategory)) {
        const entityId = Number(id) > 0 ? `DEAL_STAGE_${id}` : 'DEAL_STAGE'

        const stageResponse = await $b24.actions.v2.call.make({
            method: 'crm.status.list',
            params: {
                order: { SORT: 'ASC' },
                filter: { ENTITY_ID: entityId },
            },
            requestId: `status-list-${id}`,
        })

        if (!stageResponse.isSuccess) {
            console.error(stageResponse.getErrorMessages().join('; '))
            continue
        }

        for (const item of stageResponse.getData().result) {
            console.log(name, item.STATUS_ID, item.NAME, item.EXTRA?.SEMANTICS)
        }
    }
    ```

- PHP

    ```php
    foreach ($arCategory as $id => $name)
    {
        $entityId = $id > 0 ? 'DEAL_STAGE_' . $id : 'DEAL_STAGE';

        $stages = $sb->getCRMScope()->status()->list(
            ['SORT' => 'ASC'],
            ['ENTITY_ID' => $entityId]
        )->getStatuses();

        foreach ($stages as $item)
        {
            echo $name . ': ' . $item->STATUS_ID . ': ' . $item->NAME
                . ' - ' . ($item->EXTRA['SEMANTICS'] ?? '') . PHP_EOL;
        }
    }
    ```

- Python

    ```python
    for category_id, category_name in category_map.items():
        entity_id = f"DEAL_STAGE_{category_id}" if int(category_id) > 0 else "DEAL_STAGE"
        result_deal = client.crm.status.list(
            order={"SORT": "ASC"},
            filter={"ENTITY_ID": entity_id},
        ).response.result

        for item in result_deal:
            print(
                category_name,
                item.get("STATUS_ID", ""),
                item.get("NAME", ""),
                (item.get("EXTRA") or {}).get("SEMANTICS", ""),
            )
    ```

{% endlist %}

В ответе метод возвращает массив стадий для указанного `ENTITY_ID`.

```json
{
    "result": [
        {
            "ENTITY_ID": "DEAL_STAGE_7",
            "STATUS_ID": "NEW",
            "NAME": "Новая",
            "EXTRA": {
                "SEMANTICS": "process",
                "COLOR": "#39A8EF"
            }
        },
        {
            "ENTITY_ID": "DEAL_STAGE_7",
            "STATUS_ID": "WON",
            "NAME": "Сделка успешна",
            "EXTRA": {
                "SEMANTICS": "success",
                "COLOR": "#7BD500"
            }
        },
        {
            "ENTITY_ID": "DEAL_STAGE_7",
            "STATUS_ID": "LOSE",
            "NAME": "Сделка провалена",
            "EXTRA": {
                "SEMANTICS": "failure",
                "COLOR": "#FF5752"
            }
        }
    ],
    "total": 3
}
```

Поле `total` показывает общее количество найденных стадий для указанного `ENTITY_ID`. Метод возвращает одну страницу ответа — до 50 записей. Примеры выше обрабатывают полученные в ответе элементы.

## Полный пример кода

Пример выводит таблицу для каждой воронки сделок. В таблице показаны идентификатор стадии, название стадии и семантика.

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/')

    const categoryResponse = await $b24.actions.v2.call.make({
        method: 'crm.category.list',
        params: {
            entityTypeId: 2,
        },
        requestId: 'category-list',
    })

    if (!categoryResponse.isSuccess) {
        throw new Error(categoryResponse.getErrorMessages().join('; '))
    }

    const arCategory = categoryResponse.getData().result.categories.reduce((acc, item) => {
        acc[item.id] = item.name
        return acc
    }, {})

    for (const [id, name] of Object.entries(arCategory)) {
        const entityId = Number(id) > 0 ? `DEAL_STAGE_${id}` : 'DEAL_STAGE'

        const stageResponse = await $b24.actions.v2.call.make({
            method: 'crm.status.list',
            params: {
                order: { SORT: 'ASC' },
                filter: { ENTITY_ID: entityId },
            },
            requestId: `status-list-${id}`,
        })

        if (!stageResponse.isSuccess) {
            console.error(stageResponse.getErrorMessages().join('; '))
            continue
        }

        const table = document.createElement('table')
        const caption = document.createElement('caption')
        caption.textContent = name
        table.appendChild(caption)

        const thead = document.createElement('thead')
        const trHead = document.createElement('tr')
        for (const text of ['STATUS ID', 'NAME', 'SEMANTICS']) {
            const th = document.createElement('th')
            th.textContent = text
            trHead.appendChild(th)
        }
        thead.appendChild(trHead)
        table.appendChild(thead)

        const tbody = document.createElement('tbody')
        for (const item of stageResponse.getData().result) {
            const tr = document.createElement('tr')
            if (item.EXTRA?.COLOR) {
                tr.style.color = item.EXTRA.COLOR
            }
            for (const value of [item.STATUS_ID, item.NAME, item.EXTRA?.SEMANTICS]) {
                const td = document.createElement('td')
                td.textContent = value ?? ''
                tr.appendChild(td)
            }
            tbody.appendChild(tr)
        }
        table.appendChild(tbody)

        document.body.appendChild(table)
    }

    $b24.destroy()
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

    $log = new Logger('b24');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    // crm.category.list не имеет типизированной обертки — вызываем через core
    $result = $sb->core->call('crm.category.list', ['entityTypeId' => 2])
        ->getResponseData()
        ->getResult();

    $arCategory = array_column($result['categories'] ?? [], 'name', 'id');

    foreach ($arCategory as $id => $name):
        $entityId = $id > 0 ? 'DEAL_STAGE_' . $id : 'DEAL_STAGE';

        $stages = $sb->getCRMScope()->status()->list(
            ['SORT' => 'ASC'],
            ['ENTITY_ID' => $entityId]
        )->getStatuses();

        if (!empty($stages)):
    ?>
            <table>
                <caption><?=htmlspecialchars((string)$name, ENT_QUOTES, 'UTF-8')?></caption>
                <thead>
                <tr>
                    <th>STATUS ID</th>
                    <th>NAME</th>
                    <th>SEMANTICS</th>
                </tr>
                </thead>
                <tbody>
                <?php foreach ($stages as $item): ?>
                    <?php
                    $statusId = htmlspecialchars((string)($item->STATUS_ID ?? ''), ENT_QUOTES, 'UTF-8');
                    $stageName = htmlspecialchars((string)($item->NAME ?? ''), ENT_QUOTES, 'UTF-8');
                    $semantics = htmlspecialchars((string)($item->EXTRA['SEMANTICS'] ?? ''), ENT_QUOTES, 'UTF-8');
                    $color = (string)($item->EXTRA['COLOR'] ?? '');
                    $colorStyle = preg_match('/^#[0-9A-Fa-f]{6}$/', $color) ? ' style="color:' . $color . '"' : '';
                    ?>
                <tr<?=$colorStyle?>>
                    <td><?=$statusId?></td>
                    <td><?=$stageName?></td>
                    <td><?=$semantics?></td>
                </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    <?php endforeach; ?>
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

    try:
        categories = client.crm.category.list(entity_type_id=2).response.result.get("categories", [])
        category_map = {item["id"]: item["name"] for item in categories}

        for category_id, category_name in category_map.items():
            entity_id = f"DEAL_STAGE_{category_id}" if int(category_id) > 0 else "DEAL_STAGE"
            result_deal = client.crm.status.list(
                order={"SORT": "ASC"},
                filter={"ENTITY_ID": entity_id},
            ).response.result

            print(category_name)
            print("STATUS ID\tNAME\tSEMANTICS")
            for item in result_deal:
                print(
                    "\t".join(
                        [
                            str(item.get("STATUS_ID", "")),
                            str(item.get("NAME", "")),
                            str((item.get("EXTRA") or {}).get("SEMANTICS", "")),
                        ]
                    )
                )
    except BitrixAPIError as error:
        print(error)
    ```

{% endlist %}

## Если результат пустой или возникла ошибка

Если [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) или [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) вернул ошибку, проверьте авторизацию и права пользователя. Для работы сценария нужен доступ к CRM и scope [`crm`](../../../api-reference/scopes/permissions.md).

Если [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) вернул пустой массив `categories`, пользователь не видит доступные воронки сделок. Проверьте права пользователя на чтение CRM и повторите сценарий с первого шага.

Если [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) вернул пустой массив стадий, проверьте значение `ENTITY_ID`:

- для основной воронки с `id = 0` передавайте `DEAL_STAGE`
- для дополнительной воронки с `id > 0` передавайте `DEAL_STAGE_{id}`
- не передавайте `DEAL_STAGE_0`

После исправления `ENTITY_ID` повторите второй шаг для этой воронки.

Если в ответе есть поле `total`, но обработаны не все элементы, учтите ограничение одной страницы ответа. Примеры в туториале обрабатывают только элементы, полученные в текущем ответе.

## Проверяем результат

После запуска примера на странице появятся таблицы по полученным воронкам сделок. Заголовок таблицы — название воронки. В строках таблицы отображаются стадии этой воронки:

- `STATUS ID` — код стадии, который можно использовать в полях и фильтрах сделок
- `NAME` — название стадии в интерфейсе CRM
- `SEMANTICS` — группа стадии: `process`, `success`, `failure` или `apology`

Если в Битрикс24 есть только основная воронка, пример выведет одну таблицу. Если созданы дополнительные воронки, для каждой из них будет своя таблица.

Основная воронка имеет `id = 0`. Для нее код стадий — `DEAL_STAGE`, без суффикса `_0`.

## Продолжите изучение

- [{#T}](./how-to-get-stages-with-semantics.md)
- [{#T}](./how-to-get-elements-by-stage-filter.md)
- [{#T}](../../../api-reference/crm/status/crm-status-list.md)
