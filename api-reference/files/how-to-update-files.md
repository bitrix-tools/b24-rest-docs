# Как обновить и удалить файлы

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Заменить файл в поле Битрикс24, удалить один файл из множественного поля и сохранить при этом остальные — все это делают методы `*.update` того объекта, которому файл принадлежит. Передача нового файла разобрана в статье [Как загрузить файлы](./how-to-upload-files.md).

Единого правила для всех методов нет. Одни методы удаляют старые файлы, как только поле передано в запросе, другие оставляют их и удаляют файл только по явной команде. Перед обновлением сверьтесь с таблицей [Как методы обрабатывают файлы](#behavior): неверный формат запроса не вызывает ошибку метода — файлы пропадают из поля.

Обновление файла — это обновление объекта, поэтому нужны права на изменение объекта, а не на сам файл. Права и `scope` каждого метода указаны на его странице.

Идентификаторы в примерах замените своими значениями:

- имена файловых полей возвращают методы [crm.item.fields](../crm/universal/crm-item-fields.md), [lists.field.get](../lists/fields/lists-field-get.md) и [catalog.productProperty.list](../catalog/product-property/catalog-product-property-list.md)

- `entityTypeId` объекта CRM — метод [crm.enum.ownertype](../crm/auxiliary/enum/crm-enum-owner-type.md), а для смарт-процессов [crm.type.list](../crm/universal/user-defined-object-types/crm-type-list.md)

- `IBLOCK_ID` списка — метод [lists.get](../lists/lists/lists-get.md), `id` товара — метод [catalog.product.list](../catalog/product/catalog-product-list.md)

- идентификаторы файлов, значений свойств и привязок — методы чтения объекта, они собраны в таблице [Где взять идентификаторы](#identifiers)

## Типы файловых полей

- **Файл.** Поле не связано с Диском. Новый файл передают прямо в поле строкой в формате [Base64](./how-to-upload-files.md) или массивом из имени файла и такой строки. В поле хранится `ID` файла.

- **Файл (диск).** Поле связано с Диском, в поле хранится `ID` объекта на Диске. Такие поля есть в списках, задачах и ленте. Новую версию самого файла загружают методом [disk.file.uploadVersion](../disk/file/disk-file-upload-version.md), остальные операции с объектом на Диске — методами [disk.file.*](../disk/file/index.md).

В CRM полей типа «файл (диск)» нет: файловые поля элементов CRM — это тип «файл». Вложения комментария таймлайна работают иначе не потому, что это другой тип поля, а потому, что так устроен метод: параметр `FILES` принимает контент файла, а Битрикс24 сохраняет файл на Диск.

## Как методы обрабатывают файлы {#behavior}

#|
|| **Метод** | **Что происходит со старыми файлами** | **Как удалить файл** ||
|| [crm.item.update](../crm/universal/crm-item-update.md) | Файлы, `ID` которых не переданы в массиве, удаляются | Не передавать `ID` файла в массиве ||
|| [crm.timeline.comment.update](../crm/timeline/comments/crm-timeline-comment-update.md) | Все старые файлы удаляются, как только поле `FILES` передано в запросе | Передать пустой массив в поле `FILES` ||
|| [lists.element.update](../lists/elements/lists-element-update.md) | Файлы остаются в поле без изменений, но остальные поля элемента, не переданные в запросе, очищаются | Передать `ID` значения свойства в поле с постфиксом `_DEL` ||
|| [log.blogpost.update](../log/log-blogpost-update.md) | Остаются в посте без изменений | Передать идентификатор привязки со значением `del` в поле `FILES` ||
|| [catalog.product.update](../catalog/product/catalog-product-update.md) | Непереданные значения файлового свойства сохраняются, но `valueId` оставшихся значений после удаления меняются | Передать `valueId` и `remove` со значением `Y`, затем перечитать товар ||
|| [entity.item.update](../entity/items/entity-item-update.md) | Как у списков: файлы остаются в свойстве без изменений | Передать `ID` значения свойства в поле с постфиксом `_DEL` ||
|| [tasks.task.update](../tasks/tasks-task-update.md) | Поле `UF_TASK_WEBDAV_FILES` перезаписывается целиком: остаются только переданные файлы. Если поле не передано, файлы задачи не меняются | Не передавать идентификатор привязки в массиве или передать пустой массив ||
|| [user.update](../user/user-update.md) | Новое фото в поле `PERSONAL_PHOTO` заменяет старое | Передать в поле пустую строку ||
|| [bizproc.workflow.template.update](../bizproc/template/bizproc-workflow-template-update.md) | Старый файл в поле `TEMPLATE_DATA` заменяется новым | Удалить нельзя, поле не принимает пустое значение ||
|#

Если метода в таблице нет, работает общее правило: одиночное файловое поле заменяется новым файлом, а множественное задается запросом целиком. Файлы в поле типа «файл (диск)» ни один метод объекта не меняет — с ними работают методы Диска, порядок описан в разделе [Обновить файл в поле «файл (диск)»](#disk-field).

## Где взять идентификаторы {#identifiers}

В запрос на обновление идут разные числа, и путать их нельзя: `ID` файла, `ID` значения свойства и идентификатор привязки файла к объекту. Что именно вернет метод чтения, зависит от инструмента.

#|
|| **Что обновляем** | **Что лежит в файловом поле** | **Чем прочитать** ||
|| Поле объекта CRM | `ID` файла | [crm.item.get](../crm/universal/crm-item-get.md) ||
|| Комментарий таймлайна | `ID` файла на Диске | [crm.timeline.comment.list](../crm/timeline/comments/crm-timeline-comment-list.md) ||
|| Свойство элемента списка или хранилища данных | Ключ объекта — `ID` значения свойства, значение — `ID` файла | [lists.element.get](../lists/elements/lists-element-get.md), [entity.item.get](../entity/items/entity-item-get.md) ||
|| Пост в ленте | Идентификаторы привязки файлов Диска к посту | [log.blogpost.get](../log/log-blogpost-get.md) ||
|| Свойство товара | `value.id` — `ID` файла, `valueId` — `ID` значения свойства | [catalog.product.get](../catalog/product/catalog-product-get.md) ||
|| Задача | Идентификаторы привязки файлов Диска к задаче | [tasks.task.get](../tasks/tasks-task-get.md) ||
|| Поле «файл (диск)» вне CRM | Идентификатор привязки, `ID` файла берут из `OBJECT_ID` | [disk.attachedObject.get](../disk/attached-object/disk-attached-object-get.md) ||
|#

В свойстве элемента списка и в свойстве товара удаляют не файл, а значение свойства: в запрос идет `ID` значения, а не `ID` файла. Удаление значения не удаляет объект на Диске — файл удаляет [disk.file.delete](../disk/file/disk-file-delete.md).

## Обновить файл в одиночном поле

В одиночное поле новый файл загружают методом `*.update` в формате [Base64](./how-to-upload-files.md#array). Старый файл удалится автоматически.

В примере метод [bizproc.workflow.template.update](../bizproc/template/bizproc-workflow-template-update.md) заменяет файл шаблона бизнес-процесса с `ID` 525. Идентификатор шаблона возвращают методы [bizproc.workflow.template.add](../bizproc/template/bizproc-workflow-template-add.md) и [bizproc.workflow.template.list](../bizproc/template/bizproc-workflow-template-list.md).

{% note warning "" %}

Метод работает только в контексте приложения и только с шаблонами, которые создало это же приложение. Вебхуком его вызвать нельзя — придет ошибка `ACCESS_DENIED` с текстом `Application context required`.

{% endnote %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"ID":525,"FIELDS":{"TEMPLATE_DATA":["bp-379.bpt","base64_encoded_content_here"]},"auth":"**put_access_token_here**"}' https://**put_your_bitrix24_address**/rest/bizproc.workflow.template.update
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'bizproc.workflow.template.update',
    		{
    			ID: 525,
    			FIELDS: {
    				// Контент файла с новым шаблоном бизнес-процесса
    				TEMPLATE_DATA: [
    					"bp-379.bpt", // Первый элемент массива — имя файла
    					"base64_encoded_content_here" // Второй элемент массива — контент файла, закодированный в base64
    				]
    			}
    		}
    	);

    	const result = response.getData().result;
    	// Необходимая логика обработки результата
    	processResult(result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'bizproc.workflow.template.update',
                [
                    'ID'     => 525,
                    'FIELDS' => [
                        'TEMPLATE_DATA' => [
                            "bp-379.bpt", // Первый элемент массива — имя файла
                            "base64_encoded_content_here" // Второй элемент массива — контент файла, закодированный в base64
                        ]
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating workflow template: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'bizproc.workflow.template.update',
        {
            ID: 525,
            FIELDS: {
                // Контент файла с новым шаблоном бизнес-процесса
                TEMPLATE_DATA: [
                    "bp-379.bpt", // Первый элемент массива — имя файла
                    "base64_encoded_content_here" // Второй элемент массива — контент файла, закодированный в base64
                ]
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.workflow.template.update',
        [
            'ID' => 525,
            'FIELDS' => [
                'TEMPLATE_DATA' => [
                    'bp-379.bpt',
                    'base64_encoded_content_here'
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "bizproc.workflow.template.update", b24.Params{
    	"ID": 525,
    	"FIELDS": b24.Params{
    		// Первый элемент массива — имя файла, второй — контент в base64
    		"TEMPLATE_DATA": []string{"bp-379.bpt", "base64_encoded_content_here"},
    	},
    })
    if err != nil {
    	return fmt.Errorf("bizproc.workflow.template.update: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

В ответе придет идентификатор обновленного шаблона.

```json
{
    "result": 525
}
```

Очистить одиночное поле можно не у всех методов. В файловом поле объекта CRM значение удаляет пустая строка — так описано в разделе [Как обновить пользовательское поле типа file](../crm/universal/crm-item-update.md#kak-obnovit-polzovatelskoe-pole-tipa-file). В одиночное поле объекта CRM новый файл передают методом [crm.item.update](../crm/universal/crm-item-update.md) так.

```json
{
    "entityTypeId": 177,
    "id": 29,
    "fields": {
        "ufCrm_7_1739432938": [
            "myNewFile.pdf",
            "base64_encoded_content_here"
        ]
    }
}
```

Очищают такое поле пустой строкой.

```json
{
    "entityTypeId": 177,
    "id": 29,
    "fields": {
        "ufCrm_7_1739432938": ""
    }
}
```

Файл шаблона бизнес-процесса удалить нельзя: пустое значение `TEMPLATE_DATA` вернет ошибку `ERROR_TEMPLATE_VALIDATION_FAILURE` с текстом `Incorrect field TEMPLATE_DATA!`.

## Обновить файл во множественном поле

Порядок работы одинаковый: сначала методом чтения получите текущее состояние поля, затем вызовите метод обновления. Содержимое запроса у каждого метода свое: в CRM передают `ID` файлов, которые нужно оставить, в списках и каталоге — идентификаторы значений свойства, в ленте — `ID` файлов со значением `del`. Передавать `ID` существующего файла обратно в свойство списка нельзя, метод вернет ошибку. Сверяйтесь с таблицей [Как методы обрабатывают файлы](#behavior).

### crm.item.update — обновить поле в объекте CRM {#crm-item-update}

Для обновления полей в объектах CRM используйте универсальный метод [crm.item.update](../crm/universal/crm-item-update.md).

{% note info "" %}

Не рекомендуется использовать методы [crm.deal.update](../crm/deals/crm-deal-update.md), [crm.lead.update](../crm/leads/crm-lead-update.md), [crm.contact.update](../crm/contacts/crm-contact-update.md), [crm.company.update](../crm/companies/crm-company-update.md) для обновления файловых полей.

{% endnote %}

#### 1. Получить ID файлов в поле

Перед обновлением поля получите `ID` текущих файлов, чтобы сохранить их. Можно использовать метод [crm.item.get](../crm/universal/crm-item-get.md), он вернет все поля элемента, или метод [crm.item.list](../crm/universal/crm-item-list.md) с выбором только нужного поля типа «файл» в `select`.

В ответе придет информация по файлам: `ID` и ссылки на скачивание. Ответ сокращен, показано только файловое поле. Сохраните значения `id` — они понадобятся на следующем шаге. Ссылка `urlMachine` содержит токен авторизации: не публикуйте ее и не пишите в логи.

```json
{
    "result": {
        "items": [
            {
                "ufCrm_7_1739432938": [
                    {
                        "id": 30577,
                        "url": "https://your-domain.bitrix24.com/bitrix/services/main/ajax.php?action=crm.controller.item.getFile&SITE_ID=s1&entityTypeId=177&id=29&fieldName=UF_CRM_7_1739432938&fileId=30577",
                        "urlMachine": "https://your-domain.bitrix24.com/rest/crm.controller.item.getFile.json?auth=c2a8ad670000071b006e2cf200000001f0f107061147e530dda74d4e556cae7642992c&token=crm%7CYWN0aW9uPWNybS5jb25ZTU1NmNhZTc2NDI5OTJjIg%3D%3D.cR012fYj2JpQSObAORU0G8ZDvVc1Osnv0foUpBpaJVY%3D"
                    },
                    {
                        "id": 30581,
                        "url": "https://your-domain.bitrix24.com/bitrix/services/main/ajax.php?action=crm.controller.item.getFile&SITE_ID=s1&entityTypeId=177&id=29&fieldName=UF_CRM_7_1739432938&fileId=30581",
                        "urlMachine": "https://your-domain.bitrix24.com/rest/crm.controller.item.getFile.json?auth=c2a8ad670000071b006e2cf200000001f0f107061147e530dda74d4e556cae7642992c&token=crm%7CYWNNmNhZTc2NDI5OTJjIg%3D%3D.l6GB1qKENuwQYtQHse4GK1r%2F3zps%2FQdh%2BlFsopOuJdU%3D"
                    }
                ]
            }
        ]
    }
}
```

#### 2. Обновить файлы в поле

В зависимости от переданных параметров метод [crm.item.update](../crm/universal/crm-item-update.md) выполняет операции:

- загрузки новых файлов — передавайте контент в формате [Base64](./how-to-upload-files.md#multiple-array)

- удаления старых файлов — не передавайте `ID` этих файлов в массиве

- сохранения файлов — передавайте `ID` в массиве файлов

В примере в поле остается файл с `ID` 30577, добавляется новый файл `myNewFile.pdf`, а файл с `ID` 30581 удаляется, потому что его нет в запросе.

{% note warning "" %}

Запрос задает поле целиком. Файл, `ID` которого не попал в массив, удаляется без предупреждения и без ошибки в ответе — перед обновлением получите текущий список файлов шагом 1.

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"id":29,"entityTypeId":177,"fields":{"ufCrm_7_1739432938":[{"id":30577},["myNewFile.pdf","base64_encoded_content_here"]]}}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"id":29,"entityTypeId":177,"fields":{"ufCrm_7_1739432938":[{"id":30577},["myNewFile.pdf","base64_encoded_content_here"]]},"auth":"**put_access_token_here**"}' https://**put_your_bitrix24_address**/rest/crm.item.update
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.item.update",
    		{
    			id: 29,
    			entityTypeId: 177,
    			fields: {
    				ufCrm_7_1739432938: [
    					{
    						id: 30577 // id старого файла, который будет сохранен в поле
    					},
    					[
    						"myNewFile.pdf", // Имя нового файла
    						"base64_encoded_content_here" // Контент нового файла в формате base64
    					]
    				]
    			}
    		}
    	);

    	const result = response.getData().result;
    	// Необходимая логика обработки данных
    	processResult(result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.item.update',
                [
                    'id'           => 29,
                    'entityTypeId' => 177,
                    'fields'       => [
                        'ufCrm_7_1739432938' => [
                            [
                                'id' => 30577 // id старого файла, который будет сохранен в поле
                            ],
                            [
                                'myNewFile.pdf', // Имя нового файла
                                'base64_encoded_content_here' // Контент нового файла в формате base64
                            ]
                        ]
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating CRM item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.item.update",
        {
            id: 29,
            entityTypeId: 177,
            fields: {
                ufCrm_7_1739432938: [
                    {
                        id: 30577 // id старого файла, который будет сохранен в поле
                    },
                    [
                        "myNewFile.pdf", // Имя нового файла
                        "base64_encoded_content_here" // Контент нового файла в формате base64
                    ]
                ]
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.update',
        [
            'id' => 29,
            'entityTypeId' => 177,
            'fields' => [
                'ufCrm_7_1739432938' => [
                    [
                        'id' => 30577 // id старого файла, который будет сохранен в поле
                    ],
                    [
                        'myNewFile.pdf', // Имя нового файла
                        'base64_encoded_content_here' // Контент нового файла в формате base64
                    ]
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.item.update", b24.Params{
    	"id":           29,
    	"entityTypeId": 177,
    	"fields": b24.Params{
    		"ufCrm_7_1739432938": []any{
    			b24.Params{"id": 30577},                                     // id старого файла, который будет сохранен в поле
    			[]string{"myNewFile.pdf", "base64_encoded_content_here"},    // имя и контент нового файла
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.item.update: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

Метод вернет объект `item` с полями элемента. Ответ сокращен, показано только файловое поле: сохраненный файл 30577 и новый файл со своим `id`, а файла 30581 в поле больше нет.

```json
{
    "result": {
        "item": {
            "id": 29,
            "ufCrm_7_1739432938": [
                {
                    "id": 30577,
                    "url": "https://your-domain.bitrix24.com/bitrix/services/main/ajax.php?action=crm.controller.item.getFile&fileId=30577",
                    "urlMachine": "https://your-domain.bitrix24.com/rest/crm.controller.item.getFile.json?auth=c2a8ad670000071b..."
                },
                {
                    "id": 30591,
                    "url": "https://your-domain.bitrix24.com/bitrix/services/main/ajax.php?action=crm.controller.item.getFile&fileId=30591",
                    "urlMachine": "https://your-domain.bitrix24.com/rest/crm.controller.item.getFile.json?auth=c2a8ad670000071b..."
                }
            ]
        }
    }
}
```

Чтобы удалить из поля все файлы, передайте пустой массив. В примере метод [crm.item.update](../crm/universal/crm-item-update.md) очищает поле `ufCrm_7_1739432938` у того же элемента с `entityTypeId` 177 и `id` 29.

```json
{
    "id": 29,
    "entityTypeId": 177,
    "fields": {
        "ufCrm_7_1739432938": []
    }
}
```

Метод вернет объект `item` с полями элемента. Ответ сокращен, показано только файловое поле.

```json
{
    "result": {
        "item": {
            "id": 29,
            "ufCrm_7_1739432938": []
        }
    }
}
```

### crm.timeline.comment.update — обновить файлы в комментарии {#crm-timeline-comment-update}

Файлы комментария обновляет метод [crm.timeline.comment.update](../crm/timeline/comments/crm-timeline-comment-update.md). Сценарий из двух шагов.

1. Получите `ID` комментария методом [crm.timeline.comment.list](../crm/timeline/comments/crm-timeline-comment-list.md)
2. Передайте в `FILES` итоговый набор файлов в формате [Base64](./how-to-upload-files.md#multiple-array)

Второй шаг устроен иначе, чем у остальных методов страницы: как только поле `FILES` попало в запрос, все прежние файлы комментария удаляются, а в комментарии остается только то, что передано в этом запросе. Сохранить старый файл можно единственным способом — загрузить его заново вместе с новыми.

#### 1. Получить ID комментария

Метод [crm.timeline.comment.list](../crm/timeline/comments/crm-timeline-comment-list.md) требует фильтр по двум обязательным полям: `ENTITY_ID` — идентификатор элемента CRM, `ENTITY_TYPE` — [тип объекта CRM](../crm/data-types.md#object_type), например `deal`.

В ответе придет список комментариев элемента. Ответ сокращен: показаны `ID` комментария для шага 2 и состав поля `FILES`. Ключ объекта `FILES` совпадает с полем `id` — это `ID` файла на Диске.

```json
{
    "result": [
        {
            "ID": "62589",
            "ENTITY_ID": "2",
            "ENTITY_TYPE": "deal",
            "COMMENT": "Comment with files",
            "FILES": {
                "930": {
                    "id": 930,
                    "name": "1.gif",
                    "size": 43,
                    "urlDownload": "https://your-domain.bitrix24.com/disk/downloadFile/930/?&ncc=1&filename=1.gif"
                }
            }
        }
    ]
}
```

Чтобы оставить файл в комментарии, его придется загрузить заново — скачайте его отдельным шагом.

Ссылка `urlDownload` для этого не подходит: она ведет на интерфейс Диска и работает только в сессии пользователя. Ключ объекта `FILES` и поле `id` в нем — это `ID` файла на Диске. Передайте его в метод [disk.file.get](../disk/file/disk-file-get.md), он вернет подписанную ссылку `DOWNLOAD_URL`.

```json
{
    "id": 930
}
```
Файл по ней скачивают отдельным GET-запросом с заголовками `User-Agent`, `Accept`, `Accept-Language` и `Referer` по правилам из статьи [Как выполняется запрос](../../settings/how-to-call-rest-api/general-principles.md#headers). Ссылка `DOWNLOAD_URL` содержит токен авторизации: не публикуйте ее и не пишите в логи. Скачанный файл закодируйте в [Base64](./how-to-upload-files.md#kak-kodirovat-fajl-v-base64) и передайте в шаге 2 вместе с новыми файлами.

#### 2. Обновить файлы в комментарии

Чтобы удалить все файлы, передавайте пустой массив в поле `FILES`. Поле `COMMENT` передавайте вместе с файлами: пустой комментарий метод не примет.

{% note warning "" %}

Поле `FILES` перезаписывает вложения комментария целиком. Все файлы, которых нет в этом запросе, будут удалены, даже если поле передано ради одного нового файла.

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"id":62589,"fields":{"COMMENT":"Comment was changed","FILES":[]}}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.timeline.comment.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"id":62589,"fields":{"COMMENT":"Comment was changed","FILES":[]},"auth":"**put_access_token_here**"}' https://**put_your_bitrix24_address**/rest/crm.timeline.comment.update
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.timeline.comment.update',
    		{
    			id: 62589,
    			fields: {
    				"COMMENT": "Comment was changed",
    				"FILES": [ // пустое значение для удаления файлов
    				]
    			}
    		}
    	);

    	const result = response.getData().result;
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.timeline.comment.update',
                [
                    'id' => 62589,
                    'fields' => [
                        'COMMENT' => 'Comment was changed',
                        'FILES' => [], // пустое значение для удаления файлов
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating timeline comment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.timeline.comment.update",
        {
            id: 62589,
            fields: {
                "COMMENT": "Comment was changed",
                "FILES": [ // пустое значение для удаления файлов
                ]
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.timeline.comment.update',
        [
            'id' => 62589,
            'fields' => [
                'COMMENT' => 'Comment was changed',
                'FILES' => [] // пустое значение для удаления файлов
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.timeline.comment.update", b24.Params{
    	"id": 62589,
    	"fields": b24.Params{
    		"COMMENT": "Comment was changed",
    		"FILES":   []any{}, // пустое значение для удаления файлов
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.timeline.comment.update: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

В ответе придет идентификатор обновленного комментария.

```json
{
    "result": 62589
}
```

### lists.element.update — обновить поле в списке {#lists-element-update}

Новые файлы метод [lists.element.update](../lists/elements/lists-element-update.md) принимает в том же свойстве в формате [Base64](./how-to-upload-files.md#multiple-array) — старые файлы при этом остаются в поле. Ниже разобрано удаление: оно требует отдельного поля и предварительного запроса.

Для удаления файлов понадобится `ID` значения свойства.

{% note warning "" %}

Метод перезаписывает элемент: обычные поля, значения которых не переданы, очищаются, поэтому передавайте вместе с запросом остальные поля элемента, например `NAME`. Само файловое свойство передавать не нужно — файлы в нем сохранятся, а передача `ID` существующего файла вызовет ошибку.

{% endnote %}

#### 1. Получить ID значения свойства

Чтобы получить `ID` для удаления файла, выполните метод [lists.element.get](../lists/elements/lists-element-get.md), он вернет все поля элемента.

Поле «файл» в примере — `PROPERTY_1075`. Свойство приходит объектом, в котором:

- ключ `"3693"` — это `ID` значения свойства, его передают для удаления

- значение `"31219"` — это `ID` файла

```json
{
    "result": [
        {
            "ID": "6783",
            "NAME": "файлы реста",
            "PROPERTY_1075": {
                "3693": "31219",
                "3697": "31221",
                "3699": "31223"
            }
        }
    ],
    "total": 1
}
```

#### 2. Удалить файл из поля

Передайте в метод [lists.element.update](../lists/elements/lists-element-update.md) поле с постфиксом `_DEL`, например `PROPERTY_1075_DEL`. В поле укажите список из `ID` значений свойств, которые будут удалены:

- ключ — `ID` значения свойства

- значение — `Y`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":37,"ELEMENT_ID":6783,"FIELDS":{"NAME":"файлы реста","PROPERTY_1075_DEL":{"3693":"Y"}}}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/lists.element.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":37,"ELEMENT_ID":6783,"FIELDS":{"NAME":"файлы реста","PROPERTY_1075_DEL":{"3693":"Y"}},"auth":"**put_access_token_here**"}' https://**put_your_bitrix24_address**/rest/lists.element.update
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"lists.element.update",
    		{
    			IBLOCK_TYPE_ID: "lists",
    			IBLOCK_ID: 37,
    			ELEMENT_ID: 6783,
    			FIELDS: {
    				NAME: "файлы реста",
    				PROPERTY_1075_DEL: { // постфикс _DEL для операции удаления
    					"3693": "Y" // список значений для удаления
    				}
    			}
    		}
    	);

    	const result = response.getData().result;
    	// Необходимая логика обработки результата
    	processResult(result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'lists.element.update',
                [
                    'IBLOCK_TYPE_ID' => 'lists',
                    'IBLOCK_ID'      => 37,
                    'ELEMENT_ID'     => 6783,
                    'FIELDS'         => [
                        'NAME'            => 'файлы реста',
                        'PROPERTY_1075_DEL' => [ // постфикс _DEL для операции удаления
                            '3693' => 'Y' // список значений для удаления
                        ]
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating list element: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "lists.element.update",
        {
            IBLOCK_TYPE_ID: "lists",
            IBLOCK_ID: 37,
            ELEMENT_ID: 6783,
            FIELDS: {
                NAME: "файлы реста",
                PROPERTY_1075_DEL: { // постфикс _DEL для операции удаления
                    "3693": "Y" // список значений для удаления
                }
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'lists.element.update',
        [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => 37,
            'ELEMENT_ID' => 6783,
            'FIELDS' => [
                'NAME' => 'файлы реста',
                'PROPERTY_1075_DEL' => [ // постфикс _DEL для операции удаления
                    '3693' => 'Y' // список значений для удаления
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "lists.element.update", b24.Params{
    	"IBLOCK_TYPE_ID": "lists",
    	"IBLOCK_ID":      37,
    	"ELEMENT_ID":     6783,
    	"FIELDS": b24.Params{
    		"NAME": "файлы реста",
    		// Постфикс _DEL для операции удаления, ключ — id значения свойства
    		"PROPERTY_1075_DEL": b24.Params{"3693": "Y"},
    	},
    })
    if err != nil {
    	return fmt.Errorf("lists.element.update: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

Метод вернет `true`.

```json
{
    "result": true
}
```

### log.blogpost.update — обновить файлы в посте {#log-blogpost-update}

Новые файлы метод [log.blogpost.update](../log/log-blogpost-update.md) принимает в поле `FILES` в формате [Base64](./how-to-upload-files.md#multiple-array) — старые файлы при этом остаются в посте. Ниже разобрано удаление: в том же поле `FILES` передают `ID` файла со значением `del`.

Для удаления файлов понадобится их `ID`.

#### 1. Получить ID файла в посте

Чтобы получить `ID` для удаления файла, выполните метод [log.blogpost.get](../log/log-blogpost-get.md), он вернет все поля поста, включая `FILES`.

В поле `FILES` придет массив идентификаторов привязки — записей о том, что файлы Диска прикреплены к посту. Эти значения передают ключами при удалении, берите их из ответа `log.blogpost.get`. Чтобы получить сам файл, передайте идентификатор в [disk.attachedObject.get](../disk/attached-object/disk-attached-object-get.md) и возьмите `OBJECT_ID` из ответа.

```json
{
    "result": [
        {
            "ID": "211",
            "TITLE": "Новый регламент",
            "FILES": [
                437,
                439,
                441
            ]
        }
    ],
    "total": 1
}
```

#### 2. Удалить файл из поста

Передайте в метод [log.blogpost.update](../log/log-blogpost-update.md) поле `FILES`. В поле укажите массив `ID` файлов, которые будут удалены:

- ключ — `ID` файла

- значение — `del`

Метод требует заголовок или текст сообщения: если не передать `POST_TITLE` или `POST_MESSAGE`, придет ошибка `EMPTY_TITLE`. Значение поля `TITLE` из ответа [log.blogpost.get](../log/log-blogpost-get.md) передавайте в параметр `POST_TITLE` — имена полей у чтения и обновления разные. Если этого не сделать, пост будет переименован.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"POST_ID":211,"POST_TITLE":"Новый регламент","FILES":{"437":"del"}}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/log.blogpost.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"POST_ID":211,"POST_TITLE":"Новый регламент","FILES":{"437":"del"},"auth":"**put_access_token_here**"}' https://**put_your_bitrix24_address**/rest/log.blogpost.update
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"log.blogpost.update",
    		{
    			POST_ID: 211,
    			POST_TITLE: "Новый регламент",
    			FILES: {
    				"437": "del" // id файлов для удаления
    			}
    		}
    	);

    	const result = response.getData().result;
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'log.blogpost.update',
                [
                    'POST_ID'    => 211,
                    'POST_TITLE' => 'Новый регламент',
                    'FILES'      => [
                        '437' => 'del' // id файлов для удаления
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating blog post: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "log.blogpost.update",
        {
            POST_ID: 211,
            POST_TITLE: "Новый регламент",
            FILES: {
                "437": "del" // id файлов для удаления
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'log.blogpost.update',
        [
            'POST_ID' => 211,
            'POST_TITLE' => 'Новый регламент',
            'FILES' => [
                '437' => 'del' // id файлов для удаления
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "log.blogpost.update", b24.Params{
    	"POST_ID":    211,
    	"POST_TITLE": "Новый регламент",
    	"FILES": b24.Params{
    		"437": "del", // id файлов для удаления
    	},
    })
    if err != nil {
    	return fmt.Errorf("log.blogpost.update: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

В ответе придет идентификатор обновленного поста.

```json
{
    "result": 211
}
```

Чтобы удалить все файлы из поста, передайте в метод [log.blogpost.update](../log/log-blogpost-update.md) поле `UF_BLOG_POST_FILE`. В значении поля укажите `["empty"]`.

{% note warning "" %}

Не передавайте `FILES` и `UF_BLOG_POST_FILE` в одном запросе. Если передано поле `FILES`, значение `UF_BLOG_POST_FILE` не обрабатывается, и файлы останутся в посте.

{% endnote %}

```json
{
    "POST_ID": 211,
    "POST_TITLE": "Новый регламент",
    "UF_BLOG_POST_FILE": ["empty"]
}
```

В ответе, как и при удалении одного файла, придет идентификатор обновленного поста.

```json
{
    "result": 211
}
```

### catalog.product.update — обновить поле в товаре {#catalog-product-update}

Новые файлы метод [catalog.product.update](../catalog/product/catalog-product-update.md) принимает в свойстве товара в формате [Base64](./how-to-upload-files.md#multiple-value). Ниже разобрано удаление файла из свойства.

Для удаления файлов понадобится `ID` значения поля.

{% note info "" %}

Значения множественного файлового свойства, которые не переданы в запросе, сохраняются: чтобы удалить один файл, перечислять остальные не нужно. При этом `valueId` оставшихся значений после удаления меняются — перед следующим удалением перечитайте товар.

{% endnote %}

#### 1. Получить ID значения поля

Чтобы получить `ID` для удаления файла, выполните метод [catalog.product.get](../catalog/product/catalog-product-get.md). Метод вернет все поля товара.

Поле «файл» в примере — `property1077`. Поле содержит массив объектов:

- `value` — это информация по файлу: `ID` и ссылки на скачивание

- `valueId` — это `ID` значения поля

```json
{
    "result": {
        "product": {
            "iblockId": 25,
            "id": 541,
            "property1077": [
                {
                    "value": {
                        "id": "31251",
                        "url": "/rest/catalog.product.download?fields%5BfieldName%5D=property1077&fields%5BfileId%5D=31251&fields%5BproductId%5D=541",
                        "urlMachine": "/rest/catalog.product.download?fields%5BfieldName%5D=property1077&fields%5BfileId%5D=31251&fields%5BproductId%5D=541"
                    },
                    "valueId": "3705"
                },
                {
                    "value": {
                        "id": "31253",
                        "url": "/rest/catalog.product.download?fields%5BfieldName%5D=property1077&fields%5BfileId%5D=31253&fields%5BproductId%5D=541",
                        "urlMachine": "/rest/catalog.product.download?fields%5BfieldName%5D=property1077&fields%5BfileId%5D=31253&fields%5BproductId%5D=541"
                    },
                    "valueId": "3707"
                }
            ]
        }
    }
}
```

#### 2. Удалить файл из свойства товара

Чтобы удалить файл, передайте в метод [catalog.product.update](../catalog/product/catalog-product-update.md) поле со значениями:

- `value` — укажите `remove` как ключ, `Y` как значение

- `valueId` — укажите `ID` значения поля, файл которого будет удален

В примере из свойства `property1077` удаляется значение `3705`. Второе значение, `3707`, в запросе не передано и останется в свойстве.

В одном запросе можно удалить старый файл и загрузить новый: в массиве соседствуют элемент с `remove` и элемент с контентом в формате [Base64](./how-to-upload-files.md#multiple-value).

```json
{
    "id": 541,
    "fields": {
        "property1077": [
            {
                "value": {
                    "remove": "Y"
                },
                "valueId": "3705"
            },
            {
                "value": {
                    "fileData": [
                        "blue_pixel.txt",
                        "base64_encoded_content_here"
                    ]
                }
            }
        ]
    }
}
```

Пример ниже только удаляет значение `3705`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"id":541,"fields":{"property1077":[{"value":{"remove":"Y"},"valueId":"3705"}]}}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"id":541,"fields":{"property1077":[{"value":{"remove":"Y"},"valueId":"3705"}]},"auth":"**put_access_token_here**"}' https://**put_your_bitrix24_address**/rest/catalog.product.update
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.product.update',
    		{
    			id: 541,
    			fields: {
    				property1077: [
    					{
    						value: {
    							remove: 'Y' // операция удаления файла
    						},
    						valueId: '3705' // id значения для удаления
    					}
    				]
    			}
    		}
    	);

    	const result = response.getData().result;
    	console.log('Updated product with ID:', result);
    	// Нужная вам логика обработки данных
    	processResult(result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.product.update',
                [
                    'id' => 541,
                    'fields' => [
                        'property1077' => [
                            [
                                'value' => [
                                    'remove' => 'Y', // операция удаления файла
                                ],
                                'valueId' => '3705', // id значения для удаления
                            ]
                        ]
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating product: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.product.update',
        {
            id: 541,
            fields: {
                property1077: [
                    {
                        value: {
                            remove: 'Y' // операция удаления файла
                        },
                        valueId: '3705' // id значения для удаления
                    }
                ]
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.product.update',
        [
            'id' => 541,
            'fields' => [
                'property1077' => [
                    [
                        'value' => [
                            'remove' => 'Y' // операция удаления файла
                        ],
                        'valueId' => '3705' // id значения для удаления
                    ]
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.product.update", b24.Params{
    	"id": 541,
    	"fields": b24.Params{
    		"property1077": []b24.Params{
    			{
    				"value":   b24.Params{"remove": "Y"}, // операция удаления файла
    				"valueId": "3705",                   // id значения для удаления
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.update: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

Метод вернет объект `element` с полями товара. Ответ сокращен, показано только файловое свойство: удаленного значения в нем нет, второй файл остался, но получил `valueId` удаленного значения.

```json
{
    "result": {
        "element": {
            "id": 541,
            "property1077": [
                {
                    "value": {
                        "id": "31253",
                        "url": "/rest/catalog.product.download?fields%5BfieldName%5D=property1077&fields%5BfileId%5D=31253&fields%5BproductId%5D=541",
                        "urlMachine": "/rest/catalog.product.download?fields%5BfieldName%5D=property1077&fields%5BfileId%5D=31253&fields%5BproductId%5D=541"
                    },
                    "valueId": "3705"
                }
            ]
        }
    }
}
```

## Обновить файл в поле «файл (диск)» {#disk-field}

В таком поле лежит не сам файл, а **идентификатор привязки** — записи о том, что файл Диска прикреплен к этому объекту. Метод объекта его не меняет, работать нужно с объектом Диска. Привязку возвращают [lists.element.get](../lists/elements/lists-element-get.md), [log.blogpost.get](../log/log-blogpost-get.md), [tasks.task.get](../tasks/tasks-task-get.md) и другие методы чтения.

Комментарий таймлайна CRM в этот сценарий не входит: метод [crm.timeline.comment.list](../crm/timeline/comments/crm-timeline-comment-list.md) отдает сразу `ID` файла на Диске, шаг с привязкой не нужен.

Сценарий состоит из трех шагов.

1. Получите идентификатор привязки методом чтения объекта

2. Передайте его в метод [disk.attachedObject.get](../disk/attached-object/disk-attached-object-get.md) и возьмите из ответа `OBJECT_ID` — это `ID` файла на Диске

    ```json
    {
        "result": {
            "ID": 495,
            "OBJECT_ID": 9035,
            "DOWNLOAD_URL": "https://your-domain.bitrix24.com/bitrix/tools/disk/uf.php?attachedId=495&auth[auth]=d78a4a69...&action=download&ncc=1"
        }
    }
    ```

    Ссылка `DOWNLOAD_URL` в этом ответе содержит сам токен авторизации, а у вебхука он еще и бессрочный. Не публикуйте такую ссылку и не пишите ее в логи.

3. Загрузите новую версию файла методом [disk.file.uploadVersion](../disk/file/disk-file-upload-version.md): файл передается в параметре [fileContent](./how-to-upload-files.md#filecontent) массивом из имени файла и строки Base64

    ```json
    {
        "id": 9035,
        "fileContent": ["report.pdf", "base64_encoded_content_here"]
    }
    ```

Поле объекта при этом не меняется — в нем остается та же привязка, а файл на Диске получает новую версию. Чтобы убрать файл, удалите объект методом [disk.file.delete](../disk/file/disk-file-delete.md) или очистите поле объекта по правилам его метода из таблицы [Как методы обрабатывают файлы](#behavior).

Результат проверьте методом [disk.file.get](../disk/file/disk-file-get.md) — он вернет имя, размер и ссылку `DOWNLOAD_URL` актуальной версии.

Файловые поля элементов CRM в этот сценарий тоже не входят: это тип «файл», и они обновляются вместе с элементом методом [crm.item.update](../crm/universal/crm-item-update.md).

## Файлы в других объектах {#other-objects}

У остальных объектов Битрикс24 отдельного сценария на странице нет: обновление либо повторяет разобранные выше, либо недоступно через REST.

#|
|| **Объект** | **Заменить файл** | **Удалить файл** ||
|| Задача | [tasks.task.update](../tasks/tasks-task-update.md) — поле `UF_TASK_WEBDAV_FILES`, [tasks.task.file.attach](../tasks/tasks-task-file-attach.md) добавляет файл к уже прикрепленным | Через [tasks.task.update](../tasks/tasks-task-update.md), отдельного метода отвязки нет ||
|| Фото пользователя | [user.update](../user/user-update.md) — поле `PERSONAL_PHOTO` | Пустая строка в поле `PERSONAL_PHOTO` ||
|| Дополнительные изображения товара | Метода обновления нет: удалите изображение и добавьте новое методом [catalog.productImage.add](../catalog/product-image/catalog-product-image-add.md) | [catalog.productImage.delete](../catalog/product-image/catalog-product-image-delete.md), нужны и `id` изображения, и `productId` ||
|| Шаблон документа | [documentgenerator.template.update](../document-generator/templates/document-generator-template-update.md) — поле одиночное, новый файл заменяет старый | Отдельно файл не удаляется, удаляют весь шаблон ||
|| База знаний | Нельзя: в REST есть только [note.file.add](../note/file/note-file-add.md) и [note.file.get](../note/file/note-file-get.md) | Нельзя ||
|| Чат | Нельзя: файл загружают заново методом [im.v2.File.upload](../chat-bots/chat-bots-v2/im.v2/files/file-upload.md) | Нельзя ||
|| Запись звонка | Нельзя | Нельзя ||
|| Сайт | Повторной загрузкой методом [landing.block.uploadfile](../landing/block/methods/landing-block-upload-file.md) | Отдельного метода нет ||
|#

В задаче поле хранит идентификаторы привязок, а не `ID` файлов на Диске. Чтобы сохранить прикрепленный файл, передайте его идентификатор привязки числом, а новый файл — строкой вида `"n9851"`, где число после `n` — `ID` файла на Диске.

```json
{
    "taskId": 4017,
    "fields": {
        "UF_TASK_WEBDAV_FILES": [567, "n9851"]
    }
}
```

Очистка поля отвязывает файлы от задачи, но не удаляет их с Диска: сам файл удаляет [disk.file.delete](../disk/file/disk-file-delete.md).

## Что дальше

- [Как загрузить файлы](./how-to-upload-files.md) — форматы передачи файла и загрузка нескольких файлов во множественное поле

- [Как работать с файлами](./index.md) — обзор раздела: типы полей, связь файлов с объектами Битрикс24 и основные методы Диска

- [Кодирование данных](../../settings/how-to-call-rest-api/data-encoding.md) — как передавать данные в GET-запросах и cURL
