# Как использовать сквозную аналитику при создании лида

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Пример использования сквозной аналитики при создании лида. Предварительно создайте php-страницу с веб-формой обратной связи: Ф.И.О, телефон. На странице разместите код примера.

Что происходит во время выполнения кода?

1. Подключается стандартный js-код из сквозной аналитики Битрикс24.
2. После заполнения формы, помимо полей формы, в скрытом поле передается код для сквозной аналитики `b24Tracker.guest.getTrace()`.
3. Затем вызывается метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md), в котором в поле `TRACE` добавляется код из `getTrace`.

Скрипт сквозной аналитики устанавливается на вашем сайте перед закрывающим тегом `</body>` на всех страницах сайта, включая страницу с формой.

{% list tabs %}

- JS

    ```js
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
            <script>
                window.onload = function(e){
                    var traceInput = document.getElementById('FORM_TRACE');
                    if(traceInput)
                    {
                        traceInput.value = b24Tracker.guest.getTrace();
                    }
                }

                document.getElementById('feedbackForm').addEventListener('submit', function(event) {
                    event.preventDefault();
                    var formData = new FormData(event.target);
                    var fields = {
                        TRACE: formData.get('TRACE'),
                        NAME: formData.get('NAME'),
                        LAST_NAME: formData.get('LAST_NAME'),
                        PHONE: [{ value: formData.get('PHONE') }]
                    };

                    BX24.callMethod(
                        'crm.lead.add',
                        { fields: fields },
                        function(result) {
                            var messageElement = document.getElementById('message');
                            if(result.error()) {
                                messageElement.textContent = 'Feedback has not been saved: ' + result.error_description();
                            } else {
                                messageElement.textContent = 'Feedback saved';
                            }
                        }
                    );
                });
            </script>
        </body>
    </html>
    ```

- PHP

    {% note info %}

    Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../first-steps/how-to-use-examples.md)

    {% endnote %}

    ```php
    <!DOCTYPE html>
    <html lang="ru">
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
        </head>
        <body class="container">
            <h1>Feedback</h1>
            <?
            include("crest.php");
            $message = '';
            if(!empty($_POST['SAVE']))
            {
                $fields = [
                    'TRACE' => $_POST['TRACE'],
                    'NAME' => $_POST['NAME'],
                    'LAST_NAME' => $_POST['LAST_NAME'],
                    'PHONE' => [ [ 'value'=>$_POST['PHONE'] ] ],
                ];
                $result = CRest::call(
                    'crm.lead.add',
                    [
                        'fields' => $fields
                    ]
                );
                if (!empty($result['result']))
                {
                    $message = 'Feedback saved';
                }
                elseif (!empty($result['error_description']))
                {
                    $message =    'Feedback has not been saved: '.$result['error_description'];
                }
                else
                {
                    $message = 'Feedback has not been saved';
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
            <script>
                window.onload = function(e){
                    var traceInput = document.getElementById('FORM_TRACE');
                    if(traceInput)
                    {
                        traceInput.value = b24Tracker.guest.getTrace();
                    }
                }
            </script>
        </body>
    </html>
    ```

{% endlist %}


