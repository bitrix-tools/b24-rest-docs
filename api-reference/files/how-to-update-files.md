# Как обновить и удалить файлы

В Битрикс24 есть два типа файловых полей.

- **Файл.** Поле не связано с Диском, в него файлы загружаются напрямую через строку формата [Base64](./how-to-upload-files.md). После загрузки в поле хранится ID файла.
  
- **Файл (диск).** Поле связано с Диском, в поле хранится ID объекта диска. Поле не обрабатывает формат Base64. Для обновления файлов диска используйте методы [disk.file.*](../disk/file/index.md).

## Как обновить файл

Если поле не множественное, загрузите новый файл в поле методом `*.update`. Используйте формат передачи данных [Base64](./how-to-upload-files.md). При загрузке нового файла старый файл удалится автоматически.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"ID":525,"FIELDS":{"TEMPLATE_DATA":["bp-379.bpt","base64_encoded_content_here"]}}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/bizproc.workflow.template.update
    ```

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
    					"bp-379.bpt", // Первый элемент массива - имя файла
    					"base64_encoded_content_here" // Второй элемент массива - контент файла, закодированный в base64
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
                            "bp-379.bpt", // Первый элемент массива - имя файла
                            "base64_encoded_content_here" // Второй элемент массива - контент файла, закодированный в base64
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
                    "bp-379.bpt", // Первый элемент массива - имя файла
                    "base64_encoded_content_here" // Второй элемент массива - контент файла, закодированный в base64
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

{% endlist %}


Чтобы очистить поле, передайте пустое значение.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"id":9,"entityTypeId":177,"fields":{"ufCrm_7_1739432938":[]}}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.item.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"id":9,"entityTypeId":177,"fields":{"ufCrm_7_1739432938":[]},"auth":"**put_access_token_here**"}' https://**put_your_bitrix24_address**/rest/crm.item.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.item.update",
    		{
    			id: 9,
    			entityTypeId: 177,
    			fields: {
    				ufCrm_7_1739432938: [ // пустое значение для удаления файла из поля
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
                'crm.item.update',
                [
                    'id'           => 9,
                    'entityTypeId' => 177,
                    'fields'       => [
                        'ufCrm_7_1739432938' => [], // пустое значение для удаления файла из поля
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
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
            id: 9,
            entityTypeId: 177,
            fields: {
                ufCrm_7_1739432938: [ // пустое значение для удаления файла из поля
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
            'id' => 9,
            'entityTypeId' => 177,
            'fields' => [
                'ufCrm_7_1739432938' => []
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обновить файл во множественном поле

Если поле множественное, в поле хранится массив из `ID` файлов. При обновлении множественных полей типа «файл» учитывайте особенности методов.

### crm.item.update — обновить поле в объекте CRM

Для обновления полей в объектах CRM используйте универсальный метод [crm.item.update](../crm/universal/crm-item-update.md).

{% note info "" %}

Не рекомендуется использовать методы [crm.deal.update](../crm/deals/crm-deal-update.md), [crm.lead.update](../crm/leads/crm-lead-update.md), [crm.contact.update](../crm/contacts/crm-contact-update.md), [crm.company.update](../crm/companies/crm-company-update.md) для обновления файловых полей.

{% endnote %}

#### 1. Получить ID файлов в поле

Перед обновлением поля получите `ID` текущих файлов, чтобы сохранить их. Можно использовать метод [crm.item.get](../crm/universal/crm-item-get.md), он вернет все поля элемента, или метод [crm.item.list](../crm/universal/crm-item-list.md) с выбором только нужного поля типа «файл» в `select`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"entityTypeId":177,"select":["ufCrm_7_1739432938"],"filter":{"id":"29"}}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.item.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"entityTypeId":177,"select":["ufCrm_7_1739432938"],"filter":{"id":"29"},"auth":"**put_access_token_here**"}' https://**put_your_bitrix24_address**/rest/crm.item.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.item.list',
        {
          entityTypeId: 177,
          select: [
            "ufCrm_7_1739432938", // поле типа «файл»
          ],
          filter: {
            "id": "29",
          },
        },
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('crm.item.list', { entityTypeId: 177, select: ["ufCrm_7_1739432938"], filter: { "id": "29" } }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.item.list', { entityTypeId: 177, select: ["ufCrm_7_1739432938"], filter: { "id": "29" } }, 0)
      const result = response.getData().result || []
      for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.item.list',
                [
                    'entityTypeId' => 177,
                    'select' => [
                        "ufCrm_7_1739432938", // поле типа «файл»
                    ],
                    'filter' => [
                        "id" => "29",
                    ],
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
        echo 'Error fetching CRM items: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.list',
        {
            entityTypeId: 177,
            select: [
                "ufCrm_7_1739432938", // поле типа «файл»
            ],
            filter: {
                "id": "29",
            },
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.list',
        [
            'entityTypeId' => 177,
            'select' => [
                'ufCrm_7_1739432938' // поле типа «файл»
            ],
            'filter' => [
                'id' => '29'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

В ответе получим информацию по файлам: `ID` и ссылки на скачивание.

```json
{
    "result": {
        "items": [
            {
                "ufCrm_7_1739432938": [
                    {
                        "id": 30577, // id файла, используем для сохранения файла в поле
                        "url": "https://your-domain.bitrix24.com/bitrix/services/main/ajax.php?action=crm.controller.item.getFile&SITE_ID=s1&entityTypeId=177&id=29&fieldName=UF_CRM_7_1739432938&fileId=30577",
                        "urlMachine": "https://your-domain.bitrix24.com/rest/crm.controller.item.getFile.json?auth=c2a8ad670000071b006e2cf200000001f0f107061147e530dda74d4e556cae7642992c&token=crm%7CYWN0aW9uPWNybS5jb25ZTU1NmNhZTc2NDI5OTJjIg%3D%3D.cR012fYj2JpQSObAORU0G8ZDvVc1Osnv0foUpBpaJVY%3D"
                    },
                    {
                        "id": 30581, // id файла, используем для сохранения файла в поле
                        "url": "https:///your-domain.bitrix24.com/bitrix/services/main/ajax.php?action=crm.controller.item.getFile&SITE_ID=s1&entityTypeId=177&id=29&fieldName=UF_CRM_7_1739432938&fileId=30581",
                        "urlMachine": "https:///your-domain.bitrix24.com/rest/crm.controller.item.getFile.json?auth=c2a8ad670000071b006e2cf200000001f0f107061147e530dda74d4e556cae7642992c&token=crm%7CYWNNmNhZTc2NDI5OTJjIg%3D%3D.l6GB1qKENuwQYtQHse4GK1r%2F3zps%2FQdh%2BlFsopOuJdU%3D"
                    }
                ]
            }
        ]
    },
}
```

#### 2. Обновить файлы в поле

В зависимости от переданных параметров метод [crm.item.update](../crm/universal/crm-item-update.md) выполняет операции:

- загрузки новых файлов — передавайте контент в формате [Bаse64](./how-to-upload-files.md),

- удаления старых файлов — не передавайте `ID` этих файлов в массиве,

- сохранения файлов — передавайте `ID` в массиве файлов.

Файлы будут сохранены, если их `ID` перечислены в запросе. Файлы будут удалены, если их `ID` отсутствует в запросе.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"id":9,"entityTypeId":177,"fields":{"ufCrm_7_1739432938":[{"id":30577},["myNewFile.pdf","base64_encoded_content_here"]]}}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.item.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"id":9,"entityTypeId":177,"fields":{"ufCrm_7_1739432938":[{"id":30577},["myNewFile.pdf","base64_encoded_content_here"]]},"auth":"**put_access_token_here**"}' https://**put_your_bitrix24_address**/rest/crm.item.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.item.update",
    		{
    			id: 9,
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
                    'id'           => 9,
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
            id: 9,
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
            'id' => 9,
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

{% endlist %}

Чтобы удалить все файлы, передавайте пустой массив в поле.

### crm.timeline.comment.update — обновить файлы в комментарии

Для обновления файлов в комментариях элементов CRM используйте метод [crm.timeline.comment.update](../crm/timeline/comments/crm-timeline-comment-update.md). Старые файлы всегда удаляются при обновлении значения поля. Новые файлы загружайте в поле в формате [Base64](./how-to-upload-files.md).

Чтобы удалить все файлы, передавайте пустой массив в поле `FILES`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"id":62589,"fields":{"COMMENT":"Comment was changed","FILES":[]}}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.timeline.comment.update
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

{% endlist %}

### lists.element.update — обновить поле в списке

Чтобы загрузить новые файлы в поле элемента списка, передавайте файлы методом [lists.element.update](../lists/elements/lists-element-update.md) в формате [Base64](./how-to-upload-files.md). Старые файлы останутся в поле без изменений.

Для удаления файлов понадобится `ID` значения свойства.

#### 1. Получить ID значения свойства

Чтобы получить `ID` для удаления файла, выполните метод [lists.element.get](../lists/elements/lists-element-get.md), он вернет все поля элемента.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":"37","ELEMENT_ID":"6783"}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/lists.element.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":"37","ELEMENT_ID":"6783","auth":"**put_access_token_here**"}' https://**put_your_bitrix24_address**/rest/lists.element.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'lists.element.get',
    		{
    			IBLOCK_TYPE_ID: 'lists',
    			IBLOCK_ID: '37',
    			ELEMENT_ID: '6783'
    		}
    	);
    	
    	const result = response.getData().result;
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
                'lists.element.get',
                [
                    'IBLOCK_TYPE_ID' => 'lists',
                    'IBLOCK_ID'      => '37',
                    'ELEMENT_ID'     => '6783',
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
        echo 'Error getting list element: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'lists.element.get',
        {
            IBLOCK_TYPE_ID: 'lists',
            IBLOCK_ID: '37',
            ELEMENT_ID: '6783'
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'lists.element.get',
        [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => '37',
            'ELEMENT_ID' => '6783'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Поле «файл» в примере — `PROPERTY_1075`. В поле получим информацию:

- первое значение `"3693"` — это `ID` значения свойства,

- второе значение `"31219"`— это `ID` файла.

```json
{
    "result": [
        {
            "ID": "6783",
            "PROPERTY_1075": {
                "3693": "31219", // 3693 — id значения, используем для удаления
                "3697": "31221", // 3697 — id значения, используем для удаления
                "3699": "31223"  // 3699 — id значения, используем для удаления
            }
        }
    ],
    "total": 1,
}
```

#### 2. Удалить файл из поля

Передайте в метод [lists.element.update](../lists/elements/lists-element-update.md) поле с постфиксом `_DEL`, например `PROPERTY_1075_DEL`. В поле укажите список из `ID` значений свойств, которые будут удалены:

- ключ — `ID` значения свойства,

- значение — `Y`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":37,"ELEMENT_ID":6783,"FIELDS":{"NAME":"файлы реста","PROPERTY_1075_DEL":{"3693":"Y"}}}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/lists.element.update
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
    					3693: "Y" // список значений для удаления
    				}
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
                'lists.element.update',
                [
                    'IBLOCK_TYPE_ID' => 'lists',
                    'IBLOCK_ID'      => 37,
                    'ELEMENT_ID'     => 6783,
                    'FIELDS'         => [
                        'NAME'            => 'файлы реста',
                        'PROPERTY_1075_DEL' => [ // постфикс _DEL для операции удаления
                            3693 => 'Y' // список значений для удаления
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
                    3693: "Y" // список значений для удаления
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
                'PROPERTY_1075_DEL' => [
                    3693 => 'Y' // постфикс _DEL для операции удаления
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}


### log.blogpost.update — обновить файлы в посте

Чтобы загрузить новые файлы к посту в ленте, передавайте файлы методом [log.blogpost.update](../log/log-blogpost-update.md) в формате [Base64](./how-to-upload-files.md). Старые файлы останутся в посте без изменений.

Для удаления файлов понадобится их `ID`.

#### 1. Получить ID файла в посте

Чтобы получить `ID` для удаления файла, выполните метод [log.blogpost.get](../log/log-blogpost-get.md), он вернет все поля поста, включая `FILES`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"POST_ID":211}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/log.blogpost.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"POST_ID":211,"auth":"**put_access_token_here**"}' https://**put_your_bitrix24_address**/rest/log.blogpost.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"log.blogpost.get",
    		{
    			POST_ID: 211
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
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
                'log.blogpost.get',
                [
                    'POST_ID' => 211
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
        echo 'Error getting blog post: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "log.blogpost.get",
        {
            POST_ID: 211
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'log.blogpost.get',
        [
            'POST_ID' => 211
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

В ответе получим массив объектов:

- первое значение `0` — это порядковый `ID` файла в посте,

- второе значение `437`— это `ID` файла.

```json
[FILES] => Array
    (
        [0] => 437 
        [1] => 439
        [2] => 441
```

#### 2. Удалить файл из поста

Передайте в метод [log.blogpost.update](../log/log-blogpost-update.md) поле `FILES`. В поле укажите массив `ID` файлов, которые будут удалены:

- ключ — `ID` файла,

- значение — `del`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"POST_ID":211,"POST_TITLE":"Новый заголовок поста","FILES":{"445":"del"}}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/log.blogpost.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"POST_ID":211,"POST_TITLE":"Новый заголовок поста","FILES":{"445":"del"},"auth":"**put_access_token_here**"}' https://**put_your_bitrix24_address**/rest/log.blogpost.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"log.blogpost.update",
    		{
    			POST_ID: 211,
    			POST_TITLE: "Новый заголовок поста",
    			FILES: {
    				"445": "del" // id файлов для удаления
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
                    'POST_TITLE' => 'Новый заголовок поста',
                    'FILES'      => [
                        '445' => 'del' // id файлов для удаления
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
            POST_TITLE: "Новый заголовок поста",
            FILES: {
                "445": "del" // id файлов для удаления
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
            'POST_TITLE' => 'Новый заголовок поста',
            'FILES' => [
                '445' => 'del' // id файлов для удаления
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}


Чтобы удалить все файлы из поста, передайте в метод [log.blogpost.update](../log/log-blogpost-update.md) поле `UF_BLOG_POST_FILE`. В значении поля укажите `["empty"]`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"POST_ID":211,"POST_TITLE":"Новый заголовок поста","UF_BLOG_POST_FILE":["empty"]}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/log.blogpost.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"POST_ID":211,"POST_TITLE":"Новый заголовок поста","UF_BLOG_POST_FILE":["empty"],"auth":"**put_access_token_here**"}' https://**put_your_bitrix24_address**/rest/log.blogpost.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"log.blogpost.update",
    		{
    			POST_ID: 211,
    			POST_TITLE: "Новый заголовок поста",
    			UF_BLOG_POST_FILE: ["empty"] // удаление всех файлов поста
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
                    'POST_ID'         => 211,
                    'POST_TITLE'      => 'Новый заголовок поста',
                    'UF_BLOG_POST_FILE' => ['empty'], // удаление всех файлов поста
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
            POST_TITLE: "Новый заголовок поста",
            UF_BLOG_POST_FILE: ["empty"] // удаление всех файлов поста
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
            'POST_TITLE' => 'Новый заголовок поста',
            'UF_BLOG_POST_FILE' => ['empty'] // удаление всех файлов поста
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

### catalog.product.update — обновить поле в товаре

Чтобы загрузить новые файлы в карточку товара, передавайте файлы методом [catalog.product.update](../catalog/product/catalog-product-update.md) в формате [Base64](./how-to-upload-files.md). Старые файлы останутся в поле без изменений.

Для удаления файлов понадобится `ID` значения поля.

#### 1. Получить ID значения поля

Чтобы получить `ID` для удаления файла, выполните метод [catalog.product.get](../catalog/product/catalog-product-get.md). Метод вернет все поля товара.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"id":541}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.product.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"id":541,"auth":"**put_access_token_here**"}' https://**put_your_bitrix24_address**/rest/catalog.product.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.product.get',
    		{
    			'id': 541
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
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
                'catalog.product.get',
                [
                    'id' => 541
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
        echo 'Error getting product information: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.product.get',
        {
            'id': 541
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.product.get',
        [
            'id' => 541
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Поле «файл» в примере — `property1077`. Поле содержит массив объектов:

- `value` — это информация по файлу: `ID` и ссылки на скачивание,

- `valueId` — это `ID` значения поля.

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
                    "valueId": "3705" // id значения, используем для удаления
                },
                {
                    "value": {
                        "id": "31253",
                        "url": "/rest/catalog.product.download?fields%5BfieldName%5D=property1077&fields%5BfileId%5D=31253&fields%5BproductId%5D=541",
                        "urlMachine": "/rest/catalog.product.download?fields%5BfieldName%5D=property1077&fields%5BfileId%5D=31253&fields%5BproductId%5D=541"
                    },
                    "valueId": "3707" // id значения, используем для удаления
                }
            ],

        }
    },
}
```

#### 2. Удалить файл из поля

Чтобы удалить файл, передайте в метод [catalog.product.update](../catalog/product/catalog-product-update.md) поле со значениями:

- `value` — укажите `remove` как ключ, `Y` как значение,

- `valueId` — укажите`ID` значения поля, файл которого  будет удален.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"id":541,"fields":{"property1077":[{"value":{"remove":"Y"},"valueId":"3705"}]}}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.product.update
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
    						"value": {
    							'remove': 'Y', // операция удаления файла
    						},
    						'valueId': '3705', // id значения для удаления
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
                        "value": {
                            'remove': 'Y', // операция удаления файла
                        },
                        'valueId': '3705', // id значения для удаления
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

{% endlist %}