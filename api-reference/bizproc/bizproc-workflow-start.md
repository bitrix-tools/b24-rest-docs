# Запустить бизнес-процесс bizproc.workflow.start

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`bizproc`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор или пользователь с правом запускать бизнес-процессы для документа. Для лидов, контактов, компаний и сделок это право на изменение элемента

Метод `bizproc.workflow.start` запускает новый бизнес-процесс.

Запустить бизнес-процесс через REST можно только на платных тарифах, демо-лицензиях и лицензиях NFR.

Шаблон робота, измененный в дизайнере бизнес-процессов, на бесплатном тарифе не запускается.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TEMPLATE_ID***
[`integer`](../data-types.md) | Идентификатор шаблона бизнес-процесса. Получить идентификатор можно методом [bizproc.workflow.template.list](./template/bizproc-workflow-template-list.md) ||
|| **DOCUMENT_ID***
[`array`](../data-types.md) | Идентификатор документа для запуска бизнес-процесса в формате [`модуль`, `объект`, `ID_элемента`]. Документ должен существовать, а его тип — совпадать с типом документа, для которого создан шаблон.

Примеры записей для разных вариантов документов:

- Лид — `['crm', 'CCrmDocumentLead', 'LEAD_777']`
- Компания — `['crm', 'CCrmDocumentCompany', 'COMPANY_777']`
- Контакт — `['crm', 'CCrmDocumentContact', 'CONTACT_777']`
- Сделка — `['crm', 'CCrmDocumentDeal', 'DEAL_777']`
- Коммерческое предложение — `['crm', 'Bitrix\Crm\Integration\BizProc\Document\Quote', 'QUOTE_777']`
- Файл диска — `['disk', 'Bitrix\Disk\BizProcDocument', '777']`
- Документ процессов в ленте новостей — `['lists', 'BizprocDocument', '777']`
- Документ списков — `['lists', 'Bitrix\Lists\BizprocDocumentLists', '777']`
- Элемент смарт-процесса — `['crm', 'Bitrix\Crm\Integration\BizProc\Document\Dynamic', 'DYNAMIC_147_1']`, где `147` — это `ID` смарт-процесса, `1` — `ID` элемента смарт-процесса
- Счет — `['crm', 'Bitrix\Crm\Integration\BizProc\Document\SmartInvoice', 'SMART_INVOICE_3']`
||
|| **PARAMETERS**
[`object`](../data-types.md) | Значения параметров шаблона бизнес-процесса.

Используется, если у шаблона есть параметры. Ключи объекта — идентификаторы параметров шаблона: ключи, которых нет среди параметров запускаемой версии шаблона, не передаются в процесс.

Для передачи значения в параметр типа «Привязка к пользователю» используйте запись вида `user_ID`. Например:

```php
'PARAMETERS' => ['resp_employee' => 'user_14']
```

Для параметра типа «Файл» передайте массив из имени файла и его содержимого в [Base64](../files/how-to-upload-files.md), например `["report.txt", "SGVsbG8="]`. Вместо массива с именем и содержимым можно передать идентификатор файла отдельным значением, но пользователь без прав администратора может передать только идентификатор файла, который задан в шаблоне значением параметра по умолчанию. Другой идентификатор вызовет ошибку `ERROR_WRONG_FILE_PARAMETER`, и процесс не запустится
||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TEMPLATE_ID":1,"DOCUMENT_ID":["crm","CCrmDocumentLead","LEAD_1"],"PARAMETERS":{"Parameter1":"user_1"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/bizproc.workflow.start
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TEMPLATE_ID":1,"DOCUMENT_ID":["crm","CCrmDocumentLead","LEAD_1"],"PARAMETERS":{"Parameter1":"user_1"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/bizproc.workflow.start
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'bizproc.workflow.start',
    		{
    			TEMPLATE_ID: 1,
    			DOCUMENT_ID: [
    				'crm',
    				'CCrmDocumentLead',
    				'LEAD_1'
    			],
    			PARAMETERS: {
    				'Parameter1': 'user_1'
    			},
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log('Идентификатор процесса:', result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.bizproc.workflow.start(
            template_id=1,
            document_id=(
                "crm",
                "CCrmDocumentLead",
                "LEAD_1",
            ),
            parameters={
                "Parameter1": "user_1",
            },
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'bizproc.workflow.start',
                [
                    'TEMPLATE_ID' => 1,
                    'DOCUMENT_ID' => [
                        'crm',
                        'CCrmDocumentLead',
                        'LEAD_1'
                    ],
                    'PARAMETERS' => [
                        'Parameter1' => 'user_1'
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
        echo 'Error starting workflow: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(	
        'bizproc.workflow.start',
        {
            TEMPLATE_ID: 1,
            DOCUMENT_ID: [
                'crm',
                'CCrmDocumentLead',
                'LEAD_1'
            ],
            PARAMETERS: {
                'Parameter1': 'user_1'
            },
        },
        function(result) {
            console.log('response', result.answer);
            if(result.error())
                alert("Error: " + result.error());
            else
            console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.workflow.start',
        [
            'TEMPLATE_ID' => 1,
            'DOCUMENT_ID' => [
                'crm',
                'CCrmDocumentLead',
                'LEAD_1'
            ],
            'PARAMETERS' => [
                'Parameter1' => 'user_1'
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
    res, err := client.Core().Call(ctx, "bizproc.workflow.start", b24.Params{
    	"TEMPLATE_ID": 1,
    	"DOCUMENT_ID": []string{"crm", "CCrmDocumentLead", "LEAD_1"},
    	"PARAMETERS": b24.Params{
    		"Parameter1": "user_1",
    	},
    })
    if err != nil {
    	return fmt.Errorf("bizproc.workflow.start: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": "66e81a641752f8.56521481",
    "time": {
        "start": 1726476060.581428,
        "finish": 1726476060.813776,
        "duration": 0.23234796524047852,
        "processing": 0.002630949020385742,
        "date_start": "2024-09-16T08:41:00+00:00",
        "date_finish": "2024-09-16T08:41:00+00:00",
        "operating_reset_at": 1726476660,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`string`](../data-types.md) | Корневой элемент ответа.

Возвращает идентификатор запущенного бизнес-процесса. Его принимают методы [bizproc.workflow.terminate](./bizproc-workflow-terminate.md) и [bizproc.workflow.kill](./bizproc-workflow-kill.md) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_WRONG_WORKFLOW_ID",
    "error_description": "Empty TEMPLATE_ID"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

«Пустое значение» означает, что сервер возвращает ошибку с пустым полем `error`, причина указана в `error_description`. С пустым кодом приходят и другие ошибки запуска, кроме перечисленных в таблице.

#|
|| **Статус** |**Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_WRONG_WORKFLOW_ID` | Empty TEMPLATE_ID | Передали пустой входной параметр `TEMPLATE_ID` ||
|| `400` | `ERROR_WRONG_WORKFLOW_ID` | Запуск умных сценариев не поддерживается | Передан идентификатор шаблона умного сценария ||
|| `400` | `ERROR_WRONG_WORKFLOW_ID` | Не удалось запустить бизнес-процесс | Запуск завершился без ошибок, но не вернул идентификатор процесса ||
|| `400` | `ERROR_WRONG_WORKFLOW_ID` | Template not found | Шаблон с переданным `TEMPLATE_ID` не найден или недоступен вызывающему пользователю ||
|| `400` | Пустое значение | Wrong DOCUMENT_ID! | Документ по переданному `DOCUMENT_ID` не найден или `DOCUMENT_ID` передан в неверном формате ||
|| `400` | Пустое значение | Incorrect document type! | Не удалось определить тип документа по переданному `DOCUMENT_ID` ||
|| `400` | Пустое значение | Template type and DOCUMENT_ID mismatch! | Тип документа в шаблоне и вычисленный по `DOCUMENT_ID` тип документа не совпадают ||
|| `400` | `ERROR_WRONG_FILE_PARAMETER` | Недопустимое значение параметра типа «Файл». Передайте имя файла и его содержимое в base64 или идентификатор файла, по умолчанию заданного для этого параметра | Пользователь без прав администратора передал в параметр типа «Файл» идентификатор файла, который не задан в шаблоне значением параметра по умолчанию, или значение в неверном формате. Для администратора эта проверка не выполняется ||
|| `400` | `ERROR_WRONG_FILE_PARAMETER` | Не удалось загрузить файл | Не удалось декодировать содержимое в непустые данные или сохранить файл ||
|| `400` | `EXTERNAL_MODIFIED_TEMPLATE` | Процесс не запущен: шаблон изменен в дизайнере бизнес-процессов, а дизайнер недоступен на текущем тарифе | На бесплатном тарифе передан шаблон робота, измененный в дизайнере бизнес-процессов ||
|| `403` | `ACCESS_DENIED` | Access denied! | У пользователя нет права запускать бизнес-процессы для документа ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./bizproc-workflow-instances.md)
- [{#T}](./bizproc-workflow-terminate.md)
- [{#T}](./bizproc-workflow-kill.md)
- [{#T}](./template/bizproc-workflow-template-list.md)
