# Как получить список стадий c семантикой для объектов CRM

> Scope: [`crm, user_brief`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к CRM

Семантика стадии отражает текущее состояние элемента CRM: в работе, успешно завершен или неуспешно. Система использует значение семантики в автоматизации и в построении отчетов.

Чтобы сформировать таблицу стадий объекта CRM с семантикой, используем метод [crm.status.list](../../../api-reference/crm/status/crm-status-list.md).

## Получить список стадий с семантикой

Метод [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) возвращает описание стадий по коду стадий `ENTITY_ID` для объекта CRM.

-  [Сделки](../../../api-reference/crm/deals/index.md) — `DEAL_STAGE` для основного направления сделок и `DEAL_STAGE_xx`  для дополнительного, где xx — это идентификатор направления.

-  [Лиды](../../../api-reference/crm/leads/index.md) —  `STATUS`.

-  [Счета](../../../api-reference/crm/universal/invoice.md) — `SMART_INVOICE_STAGE_xx`, где `xx` —  значение идентификатора направления счетов.

-  [Предложения](../../../api-reference/crm/quote/index.md) — `QUOTE_STATUS`.

-  [Документы](https://helpdesk.bitrix24.ru/open/17572968/) — `SMART_DOCUMENT_STAGE_xx`, где `xx` — значение `ID` направления документов.

-  [Смарт-процессы](../../../api-reference/crm/universal/index.md) —  `DYNAMIC_xx_STAGE_xx`, где первый `xx` — это `ID` смарт-процесса, второй `xx` — это `ID` направления.

Получим описание стадий с семантикой для лидов. Для этого укажем в фильтре `filter` поле `ENTITY_ID` со значением `STATUS`.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

-  JS

    ```javascript
    BX24.callMethod(
        "crm.status.list",
        {
            order: { SORT: "ASC" }, // сортируем по возрастанию значения в поле SORT
            filter: { ENTITY_ID: "STATUS" }, // получим стадии для лидов
        },
        function(result) {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

-  PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.status.list',
        [
            'order' => [ 'SORT' => 'ASC' ],
            'filter' => [ 'ENTITY_ID' => 'STATUS' ]
        ]
    );
    ```

{% endlist %}

В результате получим массив с объектами, где каждый объект — это описание стадии.

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
            "ID": "3",
            "ENTITY_ID": "STATUS",
            "STATUS_ID": "ASSIGNED",
            "NAME": "Назначен ответственный",
            "NAME_INIT": "",
            "SORT": "20",
            "SYSTEM": "N",
            "CATEGORY_ID": null,
            "COLOR": "#FFF100",
            "SEMANTICS": null,
            "EXTRA": {
                "SEMANTICS": "process",
                "COLOR": "#FFF100"
            }
        },
        ...,
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

Объект `EXTRA.SEMANTICS` содержит семантику стадий. Возможные значения:

-  `process` — элемент CRM находится в работе,

-  `success` — работа с элементом CRM завершилась успешно,

-  `failure` — работа с элементом CRM завершилась неуспешно.

## Пример кода

Код выводит таблицы со списком стадий для лидов и коммерческих предложений.

{% list tabs %}

-  JS

   ```javascript
   /**
    * Загружает все статусы для заданного ENTITY_ID
    * @param {string} entityId — код сущности, например, 'STATUS' или 'QUOTE_STATUS'
    * @returns {Promise<Array>} — массив всех статусов
    */
   function loadStatuses(entityId) {
       return new Promise((resolve, reject) => {
           BX24.callMethod('crm.status.list', {
               filter: { ENTITY_ID: entityId },
               select: ['STATUS_ID', 'NAME', 'EXTRA'],
               order: { SORT: 'ASC' }
           }, (result) => {
               if (result.error()) {
                   reject(result.error());
                   return;
               }
               resolve(result.data());
           });
       });
   }
   
   /**
    * Группирует статусы по семантике
    */
   function groupStatusesBySemantics(statuses) {
       const groups = { success: [], process: [], failure: [] };
   
       statuses.forEach(item => {
           const semantics = item.EXTRA?.SEMANTICS || '';
           const name = item.NAME || item.STATUS_ID;
   
           if (semantics === 'success') {
               groups.success.push(name);
           } else if (semantics === 'failure') {
               groups.failure.push(name);
           } else {
               groups.process.push(name);
           }
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
           '✅ Успех': pad(success, maxLen)[i],
           '⚠️ В работе': pad(process, maxLen)[i],
           '❌ Неуспех': pad(failure, maxLen)[i]
       }));
   }
   
   // Запрашиваем статусы
   Promise.all([
       loadStatuses('STATUS').then(data => ({ type: 'Лиды', data })),
       loadStatuses('QUOTE_STATUS').then(data => ({ type: 'Коммерческие предложения', data }))
   ]).then(results => {
       results.forEach(({ type, data }) => {
           console.group(`📊 ${type}`);
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
   require_once 'crest.php';
   
   /**
    * Получает все статусы для заданного ENTITY_ID
    * @param string $entityId
    * @return array
    */
   function loadStatuses($entityId) {
       $result = CRest::call('crm.status.list', [
           'filter' => ['ENTITY_ID' => $entityId],
           'select' => ['STATUS_ID', 'NAME', 'EXTRA'],
           'order'  => ['SORT' => 'ASC']
       ]);
   
       if (!empty($result['error'])) {
           throw new Exception("Ошибка при загрузке статусов $entityId: " . $result['error_description']);
       }
   
       return $result['result'];
   }
   
   /**
    * Группирует статусы по семантике
    */
   function groupStatusesBySemantics($statuses) {
       $groups = ['success' => [], 'process' => [], 'failure' => []];
   
       foreach ($statuses as $item) {
           $semantics = $item['EXTRA']['SEMANTICS'] ?? '';
           $name = $item['NAME'] ?? $item['STATUS_ID'];
   
           if ($semantics === 'success') {
               $groups['success'][] = $name;
           } elseif ($semantics === 'failure') {
               $groups['failure'][] = $name;
           } else {
               $groups['process'][] = $name;
           }
       }
   
       return $groups;
   }
   
   /**
    * Форматирует строки таблицы
    */
   function buildTableRows($groups) {
       $success = $groups['success'];
       $process = $groups['process'];
       $failure = $groups['failure'];
       $max = max(count($success), count($process), count($failure));
   
       $success = array_pad($success, $max, '');
       $process = array_pad($process, $max, '');
       $failure = array_pad($failure, $max, '');
   
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
   
   $entities = [
       ['title' => 'Статусы лидов', 'entityId' => 'STATUS'],
       ['title' => 'Статусы коммерческих предложений', 'entityId' => 'QUOTE_STATUS']
   ];
   
   foreach ($entities as $entity) {
       try {
           $statuses = loadStatuses($entity['entityId']);
           if (empty($statuses)) {
               echo "<p>Нет статусов для " . htmlspecialchars($entity['title']) . "</p>\n";
               continue;
           }
   
           $groups = groupStatusesBySemantics($statuses);
           $rows = buildTableRows($groups);
   
           echo "<h2>" . htmlspecialchars($entity['title']) . "</h2>\n";
           echo "<table border=\"1\" style=\"border-collapse: collapse; width: 100%;\">\n";
           echo "<thead><tr>
               <th style=\"padding: 8px; background: #d4edda;\">✅ Успех</th>
               <th style=\"padding: 8px; background: #fff3cd;\">⚠️ В работе</th>
               <th style=\"padding: 8px; background: #f8d7da;\">❌ Неуспех</th>
           </tr></thead>\n<tbody>";
   
           foreach ($rows as $row) {
               echo "<tr>
                   <td style=\"padding: 6px;\">{$row[0]}</td>
                   <td style=\"padding: 6px;\">{$row[1]}</td>
                   <td style=\"padding: 6px;\">{$row[2]}</td>
               </tr>\n";
           }
   
           echo "</tbody></table><br>\n";
   
       } catch (Exception $e) {
           echo "<p style=\"color: red;\">Ошибка: " . htmlspecialchars($e->getMessage()) . "</p>\n";
       }
   }
   ```

{% endlist %}