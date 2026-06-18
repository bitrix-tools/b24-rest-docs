# Как использовать сквозную аналитику при создании лида

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с правом добавления лида. Для привязки трейса нужны права на изменение лида

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Сквозная аналитика показывает источник привлечения клиента. Когда клиент заполняет форму на сайте, в карточку лида можно передать имя, телефон и данные о рекламном канале с маршрутом посещения.

Сквозная аналитика создает трекер на сайте. Трекер собирает данные о посещении. При отправке формы код получает эти данные и связывает лид с источником привлечения клиента.

Настройка передачи данных состоит из четырех этапов.

1. Добавляем на страницу форму обратной связи и скрытое поле `TRACE`.
2. Получаем трейс посетителя через `b24Tracker.guest.getTrace()` и сохраняем идентификатор визита в скрытое поле формы.
3. Создаем лид методом [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md).
4. Связываем лид с трейсом методом [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md).

## 1\. Добавляем форму на сайт

Добавляем поля в форму обратной связи:

- `NAME` — имя клиента,
- `LAST_NAME` — фамилия клиента,
- `PHONE` — телефон клиента,
- `TRACE` — данные сквозной аналитики, скрытое поле формы.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```html
    <form id="feedbackForm">
        <input type="hidden" id="FORM_TRACE" name="TRACE">
        <input type="text" name="NAME" required>
        <input type="text" name="LAST_NAME" required>
        <input type="text" name="PHONE" required>
        <input type="submit" name="SAVE" value="Send">
    </form>
    ```

- PHP

    ```html
    <form method="post" action="">
        <input type="hidden" id="FORM_TRACE" name="TRACE">
        <input type="text" name="NAME" required>
        <input type="text" name="LAST_NAME" required>
        <input type="text" name="PHONE" required>
        <input type="submit" name="SAVE" value="Send">
    </form>
    ```

{% endlist %}

Пользователь не видит скрытое поле, но его значение отправляется вместе с остальными данными формы.

## 2\. Получаем данные сквозной аналитики

После загрузки страницы обращаемся к объекту `b24Tracker` и получаем трейс текущего посетителя. Значение записываем в скрытое поле `TRACE`.

{% list tabs %}

- JS

    ```js
    window.onload = function(e){
        var traceInput = document.getElementById('FORM_TRACE');
        if(
            traceInput
            && typeof b24Tracker !== 'undefined'
            && b24Tracker.guest
            && typeof b24Tracker.guest.getTrace === 'function'
        )
        {
            traceInput.value = b24Tracker.guest.getTrace();
        }
    }
    ```

- PHP

    ```html
    <script>
        window.onload = function(e){
            var traceInput = document.getElementById('FORM_TRACE');
            if(
                traceInput
                && typeof b24Tracker !== 'undefined'
                && b24Tracker.guest
                && typeof b24Tracker.guest.getTrace === 'function'
            )
            {
                traceInput.value = b24Tracker.guest.getTrace();
            }
        }
    </script>
    ```

{% endlist %}

Полученное значение используется для связи лида с рекламным источником и отображается в отчетах сквозной аналитики.

{% note warning "" %}

Если скрипт сквозной аналитики не установлен на сайте или не успел загрузиться до вызова `b24Tracker.guest.getTrace()`, значение `TRACE` не будет получено. Проверьте подключение скрипта на странице с формой.

{% endnote %}

## 3\. Создаем лид

Для создания лида применяем универсальный метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md). В параметре `entityTypeId` передаем значение `1` — идентификатор типа объекта лид.

В `fields` передаем следующие параметры:

- `title` — название лида,
- `name` — имя клиента,
- `lastName` — фамилия клиента,
- `fm` — телефон в формате множественного поля CRM.

Поле `fm` передаем массивом, потому что телефон в CRM хранится как множественное поле типа [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield). Для телефона указываем:

- `typeId` — тип множественного поля `PHONE`,
- `valueType` — тип значения, например `WORK`,
- `value` — номер телефона.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для лидов в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md).

{% endnote %}

{% list tabs %}

- JS

    ```js
    var formData = new FormData(event.target);
    var fields = {
        title: 'Feedback page: ' + formData.get('NAME') + ' ' + formData.get('LAST_NAME'),
        name: formData.get('NAME'),
        lastName: formData.get('LAST_NAME'),
        fm: [
            {
                typeId: 'PHONE',
                valueType: 'WORK',
                value: formData.get('PHONE')
            }
        ]
    };

    BX24.callMethod(
        'crm.item.add',
        {
            entityTypeId: 1,
            fields: fields
        },
        function(resultLead) {
            if(resultLead.error()) {
                console.log(resultLead.error_description());
            } else {
                var leadId = resultLead.data().item.id;
            }
        }
    );
    ```

- PHP

    ```php
    $name = htmlspecialchars($_POST['NAME'] ?? '');
    $lastName = htmlspecialchars($_POST['LAST_NAME'] ?? '');
    $phone = htmlspecialchars($_POST['PHONE'] ?? '');
    $fields = [
        'title' => 'Feedback page: '.$name.' '.$lastName,
        'name' => $name,
        'lastName' => $lastName,
        'fm' => [
            [
                'typeId' => 'PHONE',
                'valueType' => 'WORK',
                'value' => $phone
            ]
        ],
    ];

    $result = CRest::call(
        'crm.item.add',
        [
            'entityTypeId' => 1,
            'fields' => $fields
        ]
    );

    $leadId = $result['result']['item']['id'];
    ```

{% endlist %}

Метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) возвращает идентификатор лида в поле `result.item.id`.

Ниже приведен пример ответа в сокращенном виде. Полный формат ответа смотрите в описании метода [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md).

```json
{
    "result": {
        "item": {
            "id": 123
        }
    }
}
```

## 4\. Связываем лид с трейсом

После создания лида вызываем метод [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md), потому что `TRACE` нельзя передать напрямую в [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md).

В [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) можно передать UTM-поля: `utmSource`, `utmMedium`, `utmCampaign`, `utmContent`, `utmTerm`. Они сохраняют рекламные метки в лиде, но не заменяют полный трейс.

В метод [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md) передаем параметры:

- `TRACE` — строка с данными сквозной аналитики.
- `ENTITIES` — массив объектов, которые нужно связать с трейсом. Для лида указываем `TYPE` со значением `LEAD` и `ID` из поля `result.item.id` ответа [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md).

{% list tabs %}

- JS

    ```js
    var trace = formData.get('TRACE');

    if(trace) {
        BX24.callMethod(
            'crm.tracking.trace.add',
            {
                TRACE: trace,
                ENTITIES: [
                    {
                        TYPE: 'LEAD',
                        ID: leadId
                    }
                ]
            },
            function(resultTrace) {
                if(resultTrace.error()) {
                    console.log(resultTrace.error_description());
                }
            }
        );
    }
    ```

- PHP

    ```php
    $trace = $_POST['TRACE'] ?? '';

    if(!empty($trace))
    {
        $resultTrace = CRest::call(
            'crm.tracking.trace.add',
            [
                'TRACE' => $trace,
                'ENTITIES' => [
                    [
                        'TYPE' => 'LEAD',
                        'ID' => $leadId
                    ]
                ]
            ]
        );
    }
    ```

{% endlist %}

Если `TRACE` пустой, лид будет создан без связи со сквозной аналитикой.

Метод [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md) возвращает идентификатор созданного трейса в поле `result`.

```json
{
    "result": 341
}
```

### Полный пример кода

{% list tabs %}

- JS

    ```html
    <!DOCTYPE html>
    <html lang="ru">
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
        </head>
        <body class="container">
            <h1>Feedback</h1>
            <div class="col-12">
                <p id="message"></p>
            </div>
            <form id="feedbackForm">
                <input type="hidden" id="FORM_TRACE" name="TRACE">
                <div class="row">
                    <div class="col-4 mt-3">
                        <label>Name*</label>
                    </div>
                    <div class="col-6 mt-3">
                        <input type="text" name="NAME" required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4 mt-3">
                        <label>Last name*</label>
                    </div>
                    <div class="col-6 mt-3">
                        <input type="text" name="LAST_NAME" required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4 mt-3">
                        <label>Phone*</label>
                    </div>
                    <div class="col-6 mt-3">
                        <input type="text" name="PHONE" required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-10">
                        <input type="submit" name="SAVE" class="btn btn-primary" value="Send">
                    </div>
                </div>
            </form>
            <!-- На странице должен быть установлен скрипт сквозной аналитики Битрикс24 -->
            <script>
                window.onload = function(e){
                    var traceInput = document.getElementById('FORM_TRACE');
                    if(
                        traceInput
                        && typeof b24Tracker !== 'undefined'
                        && b24Tracker.guest
                        && typeof b24Tracker.guest.getTrace === 'function'
                    )
                    {
                        traceInput.value = b24Tracker.guest.getTrace();
                    }
                }

                document.getElementById('feedbackForm').addEventListener('submit', function(event) {
                    event.preventDefault();
                    var formData = new FormData(event.target);
                    var fields = {
                        title: 'Feedback page: ' + formData.get('NAME') + ' ' + formData.get('LAST_NAME'),
                        name: formData.get('NAME'),
                        lastName: formData.get('LAST_NAME'),
                        fm: [
                            {
                                typeId: 'PHONE',
                                valueType: 'WORK',
                                value: formData.get('PHONE')
                            }
                        ]
                    };

                    BX24.callMethod(
                        'crm.item.add',
                        {
                            entityTypeId: 1,
                            fields: fields
                        },
                        function(resultLead) {
                            var messageElement = document.getElementById('message');
                            if(resultLead.error()) {
                                messageElement.textContent = 'Лид не создан: ' + resultLead.error_description();
                            } else {
                                var leadId = resultLead.data().item.id;
                                var trace = formData.get('TRACE');

                                if(trace) {
                                    BX24.callMethod(
                                        'crm.tracking.trace.add',
                                        {
                                            TRACE: trace,
                                            ENTITIES: [
                                                {
                                                    TYPE: 'LEAD',
                                                    ID: leadId
                                                }
                                            ]
                                        },
                                        function(resultTrace) {
                                            if(resultTrace.error()) {
                                                messageElement.textContent = 'Лид создан, но трейс не сохранен: ' + resultTrace.error_description();
                                            } else {
                                                messageElement.textContent = 'Лид создан';
                                            }
                                        }
                                    );
                                } else {
                                    messageElement.textContent = 'Лид создан без трейса';
                                }
                            }
                        }
                    );
                });
            </script>
        </body>
    </html>
    ```

- PHP

    ```php
    <!DOCTYPE html>
    <html lang="ru">
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
        </head>
        <body class="container">
            <h1>Feedback</h1>
            <?php
            include("crest.php");
            $message = '';
            if(!empty($_POST['SAVE']))
            {
                $name = htmlspecialchars($_POST['NAME'] ?? '');
                $lastName = htmlspecialchars($_POST['LAST_NAME'] ?? '');
                $phone = htmlspecialchars($_POST['PHONE'] ?? '');
                $trace = $_POST['TRACE'] ?? '';
                $fields = [
                    'title' => 'Feedback page: '.$name.' '.$lastName,
                    'name' => $name,
                    'lastName' => $lastName,
                    'fm' => [
                        [
                            'typeId' => 'PHONE',
                            'valueType' => 'WORK',
                            'value' => $phone
                        ]
                    ],
                ];
                $result = CRest::call(
                    'crm.item.add',
                    [
                        'entityTypeId' => 1,
                        'fields' => $fields
                    ]
                );
                if (!empty($result['result']['item']['id']))
                {
                    $leadId = $result['result']['item']['id'];
                    if(!empty($trace))
                    {
                        $resultTrace = CRest::call(
                            'crm.tracking.trace.add',
                            [
                                'TRACE' => $trace,
                                'ENTITIES' => [
                                    [
                                        'TYPE' => 'LEAD',
                                        'ID' => $leadId
                                    ]
                                ]
                            ]
                        );
                        if (!empty($resultTrace['error_description']))
                        {
                            $message = 'Лид создан, но трейс не сохранен: '.$resultTrace['error_description'];
                        }
                        else
                        {
                            $message = 'Лид создан';
                        }
                    }
                    else
                    {
                        $message = 'Лид создан без трейса';
                    }
                }
                elseif (!empty($result['error_description']))
                {
                    $message =    'Лид не создан: '.$result['error_description'];
                }
                else
                {
                    $message = 'Лид не создан';
                }
            }
            ?>
            <div class="col-12">
                <p><?=$message?></p>
            </div>
            <form method="post" action="">
                <input type="hidden" id="FORM_TRACE" name="TRACE">
                <div class="row">
                    <div class="col-4 mt-3">
                        <label>Name*</label>
                    </div>
                    <div class="col-6 mt-3">
                        <input type="text" name="NAME" required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4 mt-3">
                        <label>Last name*</label>
                    </div>
                    <div class="col-6 mt-3">
                        <input type="text" name="LAST_NAME" required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4 mt-3">
                        <label>Phone*</label>
                    </div>
                    <div class="col-6 mt-3">
                        <input type="text" name="PHONE" required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-10">
                        <input type="submit" name="SAVE" class="btn btn-primary" value="Send">
                    </div>
                </div>
            </form>
            <!-- На странице должен быть установлен скрипт сквозной аналитики Битрикс24 -->
            <script>
                window.onload = function(e){
                    var traceInput = document.getElementById('FORM_TRACE');
                    if(
                        traceInput
                        && typeof b24Tracker !== 'undefined'
                        && b24Tracker.guest
                        && typeof b24Tracker.guest.getTrace === 'function'
                    )
                    {
                        traceInput.value = b24Tracker.guest.getTrace();
                    }
                }
            </script>
        </body>
    </html>
    ```

{% endlist %}

## Проверяем результат

После отправки формы в CRM появится новый лид с именем, фамилией и телефоном клиента. Если поле `TRACE` заполнено, метод [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md) свяжет лид с данными сквозной аналитики.

## Продолжите изучение

- [{#T}](./info-to-analitics.md)
- [{#T}](./use-analitics-for-add-contact.md)
- [{#T}](../../../api-reference/crm/tracking/crm-tracking-trace-add.md)
- [{#T}](../../../api-reference/crm/universal/crm-item-add.md)
