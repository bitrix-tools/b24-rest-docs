# Как получить список стадий с семантикой для объектов CRM

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом на чтение хотя бы одного объекта CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Семантика стадии отражает текущее состояние элемента CRM: в работе, успешно завершен или неуспешно. Система использует значение семантики в автоматизации и в построении отчетов.

Стадии любого объекта CRM возвращает один метод — [crm.status.list](../../../api-reference/crm/status/crm-status-list.md). Он отдает стадии одного справочника, который задается кодом `ENTITY_ID` в фильтре. В результате получим список стадий с семантикой для выбранного объекта.

Сценарий состоит из двух шагов.

1. Определить код справочника `ENTITY_ID` для нужного объекта CRM
2. Получить стадии этого справочника методом [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) и прочитать семантику каждой стадии

## 1. Определяем код справочника {#entity-id}

Код справочника зависит от объекта CRM и от воронки.

#|
|| **Объект CRM** | **Код `ENTITY_ID`** | **Где взять числовую часть** ||
|| [Лиды](../../../api-reference/crm/leads/index.md) | `STATUS` | Постоянный код, числовой части нет ||
|| [Сделки](../../../api-reference/crm/deals/index.md) | `DEAL_STAGE` для основной воронки, `DEAL_STAGE_{categoryId}` для остальных | `categoryId` — идентификатор воронки сделок из метода [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) с `entityTypeId`: `2` ||
|| [Предложения](../../../api-reference/crm/quote/index.md) | `QUOTE_STATUS` | Постоянный код, числовой части нет ||
|| [Счета](../../../api-reference/crm/universal/invoice.md) | `SMART_INVOICE_STAGE_{categoryId}` | `categoryId` — идентификатор воронки счетов из метода [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) с `entityTypeId`: `31` ||
|| [Документы](https://helpdesk.bitrix24.ru/open/17572968/) | `SMART_DOCUMENT_STAGE_{categoryId}` | `categoryId` — идентификатор воронки документов из метода [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) с `entityTypeId`: `36` ||
|| [Смарт-процессы](../../../api-reference/crm/universal/index.md) | `DYNAMIC_{entityTypeId}_STAGE_{categoryId}` | `entityTypeId` — идентификатор типа смарт-процесса из метода [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md), `categoryId` — идентификатор воронки из метода [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) с этим `entityTypeId` ||
|#

В коде смарт-процесса используется `entityTypeId`, а не `id` из ответа [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md). Это разные числа: у смарт-процесса с `id`: `7` значение `entityTypeId` равно `177`, поэтому код справочника его основной воронки — `DYNAMIC_177_STAGE_7`, а не `DYNAMIC_7_STAGE_7`.

Для лидов код постоянный, поэтому дальше в примерах используем `STATUS`.

## 2. Получаем стадии с семантикой

Вызовем метод [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) с параметрами:

- `filter` — укажем поле `ENTITY_ID` со значением `STATUS`, чтобы получить стадии лидов
- `order` — отсортируем по полю `SORT` по возрастанию, чтобы стадии шли в том же порядке, что и в интерфейсе

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

-  JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const result = await $b24.actions.v2.call.make({
        method: 'crm.status.list',
        params: {
            order: { SORT: 'ASC' }, // сортируем по возрастанию значения в поле SORT
            filter: { ENTITY_ID: 'STATUS' }, // получим стадии для лидов
        },
        requestId: 'status-list'
    });

    if (result.isSuccess) {
        console.dir(result.getData().result);
    } else {
        console.error(result.getErrorMessages().join('; '));
    }
    ```

-  PHP

    ```php
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

    $statuses = $sb->getCRMScope()->status()->list(
        ['SORT' => 'ASC'], // сортируем по возрастанию значения в поле SORT
        ['ENTITY_ID' => 'STATUS'] // получим стадии для лидов
    )->getStatuses();
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

    result = client.crm.status.list(
        order={"SORT": "ASC"},  # сортируем по возрастанию значения в поле SORT
        filter={"ENTITY_ID": "STATUS"},  # получим стадии для лидов
    ).response.result
    ```

{% endlist %}

В результате получим массив с объектами, где каждый объект — это описание стадии. Ответ сокращен, показаны первая и две последние стадии.

```json
{
    "result": [
        {
            "ID": "1",
            "ENTITY_ID": "STATUS",
            "STATUS_ID": "NEW",
            "NAME": "Не обработан",
            "NAME_INIT": "Не обработан",
            "SORT": "10",
            "SYSTEM": "Y",
            "CATEGORY_ID": null,
            "COLOR": "#00FFFF",
            "SEMANTICS": null,
            "EXTRA": {
                "SEMANTICS": "process",
                "COLOR": "#00FFFF"
            }
        },
        {
            "ID": "15",
            "ENTITY_ID": "STATUS",
            "STATUS_ID": "CONVERTED",
            "NAME": "Сконвертирован",
            "NAME_INIT": "Сконвертирован",
            "SORT": "50",
            "SYSTEM": "Y",
            "CATEGORY_ID": null,
            "COLOR": "#37B44A",
            "SEMANTICS": "S",
            "EXTRA": {
                "SEMANTICS": "success",
                "COLOR": "#37B44A"
            }
        },
        {
            "ID": "17",
            "ENTITY_ID": "STATUS",
            "STATUS_ID": "JUNK",
            "NAME": "Некачественный лид",
            "NAME_INIT": "Некачественный лид",
            "SORT": "60",
            "SYSTEM": "Y",
            "CATEGORY_ID": null,
            "COLOR": "#F54819",
            "SEMANTICS": "F",
            "EXTRA": {
                "SEMANTICS": "failure",
                "COLOR": "#F54819"
            }
        }
    ],
    "total": 6
}
```

## Читаем семантику из ответа {#semantics}

Метод возвращает семантику в двух разных полях, и какое из них заполнено — зависит от объекта CRM.

- `EXTRA.SEMANTICS` — текстовая семантика: `process`, `success` или `failure`. Метод добавляет объект `EXTRA` только для лидов, сделок и предложений, то есть для кодов `STATUS`, `DEAL_STAGE`, `DEAL_STAGE_{categoryId}` и `QUOTE_STATUS`

- `SEMANTICS` — краткая семантика: `null`, `S` или `F`. Это поле заполнено у всех объектов CRM, включая счета, документы и смарт-процессы

{% note warning "" %}

Код, который читает только `EXTRA.SEMANTICS`, для счетов, документов и смарт-процессов получит пустое значение на каждой стадии. Успешные и неуспешные финалы у них ошибочно попадут в группу «в работе».

{% endnote %}

Чтобы код работал для любого объекта CRM, читайте `EXTRA.SEMANTICS`, а при его отсутствии переводите краткое значение `SEMANTICS` в текстовое по таблице.

#|
|| **`SEMANTICS`** | **`EXTRA.SEMANTICS`** | **Состояние элемента CRM** ||
|| `null` | `process` | Элемент в работе ||
|| `S` | `success` | Работа с элементом завершилась успешно ||
|| `F` | `failure` | Работа с элементом завершилась неуспешно ||
|#

Для сравнения — ответ для основной воронки смарт-процесса с `entityTypeId`: `177`, то есть с фильтром `ENTITY_ID`: `DYNAMIC_177_STAGE_7`. Ключа `EXTRA` в объектах нет, семантика есть только в поле `SEMANTICS`.

```json
{
    "result": [
        {
            "ID": "263",
            "ENTITY_ID": "DYNAMIC_177_STAGE_7",
            "STATUS_ID": "DT177_7:NEW",
            "NAME": "Начало",
            "NAME_INIT": "Начало",
            "SORT": "10",
            "SYSTEM": "Y",
            "CATEGORY_ID": "7",
            "COLOR": "#22B9FF",
            "SEMANTICS": null
        },
        {
            "ID": "269",
            "ENTITY_ID": "DYNAMIC_177_STAGE_7",
            "STATUS_ID": "DT177_7:SUCCESS",
            "NAME": "Успех",
            "NAME_INIT": "Успех",
            "SORT": "40",
            "SYSTEM": "Y",
            "CATEGORY_ID": "7",
            "COLOR": "#00ff00",
            "SEMANTICS": "S"
        },
        {
            "ID": "271",
            "ENTITY_ID": "DYNAMIC_177_STAGE_7",
            "STATUS_ID": "DT177_7:FAIL",
            "NAME": "Провал",
            "NAME_INIT": "Провал",
            "SORT": "50",
            "SYSTEM": "Y",
            "CATEGORY_ID": "7",
            "COLOR": "#ff0000",
            "SEMANTICS": "F"
        }
    ],
    "total": 5
}
```

## Проверим результат

Сценарий выполнен, если в ответе есть стадии и у каждой определилась семантика.

- в ответе непустой массив `result`, а поле `total` совпадает с количеством стадий выбранной воронки в интерфейсе Битрикс24

- ровно одна стадия имеет `SEMANTICS`: `S`. Так устроена любая воронка: успешный финал в ней один. Неуспешных финалов со значением `F` может быть несколько, у остальных стадий значение `null`

- значения `NAME` совпадают с названиями стадий в канбане объекта CRM. Стадии лидов открываются в разделе CRM → Лиды → Канбан, стадии смарт-процесса — в его канбане на вкладке нужной воронки

Если объект в ответе один и его `NAME` совпадает с названием стадии, а `ENTITY_ID` — с кодом из шага 1, семантику можно проверить точечно: у финальной успешной стадии `SEMANTICS` равно `S`.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `400` `Access denied.` | У пользователя нет прав на чтение объектов CRM. Проверьте, от имени какого пользователя создан вебхук ||
|| `400` `Invalid parameters.` | В `filter` или `order` переданы некорректные значения. Состав полей для фильтрации и сортировки возвращает метод [crm.status.fields](../../../api-reference/crm/status/crm-status-fields.md) ||
|| `400` `Filter by ENTITY_ID must be a string` | В `filter` поле `ENTITY_ID` передано массивом. Метод фильтрует по одному справочнику за вызов — передайте строку, а для нескольких объектов сделайте несколько вызовов ||
|#

Метод может вернуть пустой `result` без ошибки. Это значит, что справочника с таким кодом в Битрикс24 нет.

- проверьте числовую часть кода. Для смарт-процессов частая причина — `id` вместо `entityTypeId`: код `DYNAMIC_7_STAGE_7` вернет пустой список, а `DYNAMIC_177_STAGE_7` — стадии

- проверьте идентификатор воронки. Воронку могли удалить или у объекта ее вообще нет — актуальный список возвращает метод [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md)

Метод ничего не изменяет, поэтому повторять вызов после ошибки можно сколько угодно раз.

## Что важно учитывать

- метод игнорирует параметр `select` и всегда возвращает полный набор полей стадии. Сокращать выборку на стороне API не получится, отбирайте нужные поля уже в своем коде

- у каждой воронки свой справочник стадий. Стадии всех воронок одного объекта одним вызовом не получить — переберите воронки из метода [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) и вызовите [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) для каждого кода

- `STATUS_ID` уникален только внутри своего справочника. У стадий разных воронок совпадают и коды, и названия, поэтому храните стадию вместе с ее `ENTITY_ID`

- поле `SEMANTICS` в фильтре принимает только строку. Значение `null` в фильтре не задать — стадии в работе отбирайте уже в своем коде

- у объекта «Документ компании» отдельный код справочника — `SMART_B2E_DOC_STAGE_{categoryId}`, его `entityTypeId` равен `39`. Он работает по тем же правилам, что и остальные коды с числовой частью

## Пример кода

Код выводит таблицы со списком стадий для лидов и для основной воронки смарт-процесса. Семантика определяется универсально, поэтому таблица собирается одинаково для объекта с `EXTRA` и без него.

Замените `DYNAMIC_177_STAGE_7` на код справочника своего объекта из шага 1.

{% list tabs %}

-  JS

   ```javascript
   import { B24Hook } from '@bitrix24/b24jssdk'

   const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
   // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

   // Краткая семантика в текстовую: этих значений всего три
   const SEMANTICS_MAP = { S: 'success', F: 'failure' };

   /**
    * Загружает все стадии для заданного ENTITY_ID
    * @param {string} entityId — код справочника, например, 'STATUS' или 'DYNAMIC_177_STAGE_7'
    * @returns {Promise<Array>} — массив всех стадий
    */
   async function loadStatuses(entityId) {
       const result = await $b24.actions.v2.call.make({
           method: 'crm.status.list',
           params: {
               filter: { ENTITY_ID: entityId },
               order: { SORT: 'ASC' }
           },
           requestId: 'status-list'
       });
       if (!result.isSuccess) {
           throw new Error(result.getErrorMessages().join('; '));
       }
       return result.getData().result;
   }

   /**
    * Возвращает семантику стадии для любого объекта CRM.
    * EXTRA есть только у лидов, сделок и предложений, поэтому для остальных
    * объектов переводим краткое значение SEMANTICS в текстовое
    */
   function getSemantics(item) {
       return item.EXTRA?.SEMANTICS || SEMANTICS_MAP[item.SEMANTICS] || 'process';
   }

   /**
    * Группирует стадии по семантике
    */
   function groupStatusesBySemantics(statuses) {
       const groups = { success: [], process: [], failure: [] };

       statuses.forEach(item => {
           const name = item.NAME || item.STATUS_ID;
           groups[getSemantics(item)].push(name);
       });

       return groups;
   }

   /**
    * Форматирует группы для console.table
    */
   function formatForConsoleTable(groups) {
       const { success, process, failure } = groups;
       const maxLen = Math.max(success.length, process.length, failure.length);

       const pad = (arr, len) => [...arr, ...Array(len - arr.length).fill('')];

       return Array(maxLen).fill().map((_, i) => ({
           'Успех': pad(success, maxLen)[i],
           'В работе': pad(process, maxLen)[i],
           'Неуспех': pad(failure, maxLen)[i]
       }));
   }

   // Запрашиваем стадии: у лидов семантика в EXTRA, у смарт-процесса — в SEMANTICS
   Promise.all([
       loadStatuses('STATUS').then(data => ({ type: 'Лиды', data })),
       loadStatuses('DYNAMIC_177_STAGE_7').then(data => ({ type: 'Смарт-процесс', data }))
   ]).then(results => {
       results.forEach(({ type, data }) => {
           console.group(type);
           const groups = groupStatusesBySemantics(data);
           console.table(formatForConsoleTable(groups));
           console.groupEnd();
       });
   }).catch(err => {
       console.error('Ошибка загрузки:', err);
   });
   ```

-  PHP

   ```php
   <?php
   // composer require bitrix24/b24phpsdk:"^3.0"
   require_once 'vendor/autoload.php';

   use Bitrix24\SDK\Services\ServiceBuilderFactory;
   use Bitrix24\SDK\Services\ServiceBuilder;
   use Symfony\Component\EventDispatcher\EventDispatcher;
   use Monolog\Logger;
   use Monolog\Handler\StreamHandler;

   $log = new Logger('b24');
   $log->pushHandler(new StreamHandler('php://stdout'));

   $sb = (new ServiceBuilderFactory(new EventDispatcher(), $log))
       ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

   // Краткая семантика в текстовую: этих значений всего три
   const SEMANTICS_MAP = ['S' => 'success', 'F' => 'failure'];

   /**
    * Получает все стадии для заданного ENTITY_ID
    */
   function loadStatuses(ServiceBuilder $sb, string $entityId): array {
       return $sb->getCRMScope()->status()->list(
           ['SORT' => 'ASC'],
           ['ENTITY_ID' => $entityId]
       )->getStatuses();
   }

   /**
    * Возвращает семантику стадии для любого объекта CRM.
    * EXTRA есть только у лидов, сделок и предложений, поэтому для остальных
    * объектов переводим краткое значение SEMANTICS в текстовое
    */
   function getSemantics($item): string {
       $extra = $item->EXTRA['SEMANTICS'] ?? '';
       if ($extra !== '') {
           return $extra;
       }
       return SEMANTICS_MAP[$item->SEMANTICS] ?? 'process';
   }

   /**
    * Группирует стадии по семантике
    */
   function groupStatusesBySemantics(array $statuses): array {
       $groups = ['success' => [], 'process' => [], 'failure' => []];

       foreach ($statuses as $item) {
           $name = $item->NAME ?? $item->STATUS_ID;
           $groups[getSemantics($item)][] = $name;
       }

       return $groups;
   }

   /**
    * Форматирует строки таблицы
    */
   function buildTableRows(array $groups): array {
       $max = max(count($groups['success']), count($groups['process']), count($groups['failure']));

       $success = array_pad($groups['success'], $max, '');
       $process = array_pad($groups['process'], $max, '');
       $failure = array_pad($groups['failure'], $max, '');

       $rows = [];
       for ($i = 0; $i < $max; $i++) {
           $rows[] = [
               htmlspecialchars($success[$i]),
               htmlspecialchars($process[$i]),
               htmlspecialchars($failure[$i])
           ];
       }
       return $rows;
   }

   // У лидов семантика в EXTRA, у смарт-процесса — в SEMANTICS
   $entities = [
       ['title' => 'Стадии лидов', 'entityId' => 'STATUS'],
       ['title' => 'Стадии смарт-процесса', 'entityId' => 'DYNAMIC_177_STAGE_7']
   ];

   foreach ($entities as $entity) {
       try {
           $statuses = loadStatuses($sb, $entity['entityId']);
           if (empty($statuses)) {
               echo "<p>Нет стадий для " . htmlspecialchars($entity['title']) . "</p>\n";
               continue;
           }

           $rows = buildTableRows(groupStatusesBySemantics($statuses));

           echo "<h2>" . htmlspecialchars($entity['title']) . "</h2>\n";
           echo "<table border=\"1\" style=\"border-collapse: collapse; width: 100%;\">\n";
           echo "<thead><tr>
               <th style=\"padding: 8px; background: #d4edda;\">Успех</th>
               <th style=\"padding: 8px; background: #fff3cd;\">В работе</th>
               <th style=\"padding: 8px; background: #f8d7da;\">Неуспех</th>
           </tr></thead>\n<tbody>";

           foreach ($rows as $row) {
               echo "<tr>
                   <td style=\"padding: 6px;\">{$row[0]}</td>
                   <td style=\"padding: 6px;\">{$row[1]}</td>
                   <td style=\"padding: 6px;\">{$row[2]}</td>
               </tr>\n";
           }

           echo "</tbody></table><br>\n";

       } catch (\Throwable $e) {
           echo "<p style=\"color: red;\">Ошибка: " . htmlspecialchars($e->getMessage()) . "</p>\n";
       }
   }
   ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    # Краткая семантика в текстовую: этих значений всего три
    SEMANTICS_MAP = {"S": "success", "F": "failure"}


    def load_statuses(client, entity_id: str) -> list:
        return client.crm.status.list(
            filter={"ENTITY_ID": entity_id},
            order={"SORT": "ASC"},
        ).response.result


    def get_semantics(item: dict) -> str:
        """Возвращает семантику стадии для любого объекта CRM.

        EXTRA есть только у лидов, сделок и предложений, поэтому для остальных
        объектов переводим краткое значение SEMANTICS в текстовое.
        """
        extra = (item.get("EXTRA") or {}).get("SEMANTICS")
        if extra:
            return extra
        return SEMANTICS_MAP.get(item.get("SEMANTICS"), "process")


    def group_statuses_by_semantics(statuses: list) -> dict:
        groups = {"success": [], "process": [], "failure": []}
        for item in statuses:
            name = item.get("NAME") or item.get("STATUS_ID")
            groups[get_semantics(item)].append(name)
        return groups


    def build_table_rows(groups: dict) -> list:
        max_len = max(len(groups["success"]), len(groups["process"]), len(groups["failure"]))

        success = groups["success"] + [""] * (max_len - len(groups["success"]))
        process = groups["process"] + [""] * (max_len - len(groups["process"]))
        failure = groups["failure"] + [""] * (max_len - len(groups["failure"]))

        return [[success[i], process[i], failure[i]] for i in range(max_len)]


    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    # У лидов семантика в EXTRA, у смарт-процесса — в SEMANTICS
    entities = [
        {"title": "Стадии лидов", "entity_id": "STATUS"},
        {"title": "Стадии смарт-процесса", "entity_id": "DYNAMIC_177_STAGE_7"},
    ]

    for entity in entities:
        try:
            statuses = load_statuses(client, entity["entity_id"])
        except BitrixAPIError as error:
            print(f"Ошибка загрузки: {error}")
            continue

        if not statuses:
            print(f"Нет стадий для {entity['title']}")
            continue

        print(entity["title"])
        print("Успех\tВ работе\tНеуспех")
        for row in build_table_rows(group_statuses_by_semantics(statuses)):
            print("\t".join(row))
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](../../../api-reference/crm/status/crm-status-list.md)
- [{#T}](../../../api-reference/crm/status/crm-status-fields.md)
- [{#T}](../../../api-reference/crm/universal/category/crm-category-list.md)
- [{#T}](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md)
- [{#T}](./how-to-get-deal-funnels.md)
