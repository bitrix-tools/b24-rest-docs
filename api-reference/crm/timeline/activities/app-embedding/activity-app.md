# Как создать дело из приложения

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Права проверяются для связанного с делом элемента CRM:
>
> - [crm.activity.add](../activity-base/crm-activity-add.md) и [crm.activity.update](../activity-base/crm-activity-update.md) — право на изменение элемента
> - [crm.activity.delete](../activity-base/crm-activity-delete.md) — право на удаление элемента

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Установленное приложение может добавить дело в таймлайн карточки CRM.

Когда сотрудник откроет его, Битрикс24 покажет страницу приложения в боковой панели. Так можно работать с приложением прямо из карточки: смотреть связанные данные, выполнять нужные действия или обращаться к внешнему сервису.

## Как работает сценарий {#workflow}

В сценарии участвуют пользователь, Битрикс24 и приложение:

- пользователь — выбирает элемент CRM и работает с созданным делом в таймлайне
- Битрикс24 — сохраняет дело и передает странице приложения параметры его открытия
- приложение — создает, изменяет или удаляет дело через REST API

Сначала пользователь выбирает на странице приложения элемент CRM — в этом сценарии лид. Приложение создает для него дело методом [crm.activity.add](../activity-base/crm-activity-add.md). Дело появляется в таймлайне лида.

Когда пользователь нажимает на это дело, Битрикс24 открывает страницу приложения и передает идентификатор дела в `PLACEMENT_OPTIONS`. Так приложение понимает, с каким делом нужно работать, и может изменить или удалить его.

В сценарии будем использовать методы:

- [crm.activity.add](../activity-base/crm-activity-add.md) — создадим дело приложения
- [crm.activity.update](../activity-base/crm-activity-update.md) — изменим или завершим дело
- [crm.activity.delete](../activity-base/crm-activity-delete.md) — удалим дело

Дальше соберем страницу приложения по шагам: подготовим файл, определим режим открытия, добавим интерфейс и настроим работу с делом. Для вызова REST-методов и функций интерфейса используем JavaScript-библиотеку [BX24.js](../../../../../sdk/bx24-js-sdk/index.md).

## 1. Подготовьте приложение {#start}

Создайте [приложение](../../../../../settings/app-installation/index.md) со scope [`crm`](../../../../scopes/permissions.md) и подготовьте сервер, доступный из внешней сети.

Создайте на сервере файл `index.php`. В следующих шагах последовательно добавляйте в него блоки кода. После последнего шага получится готовая страница приложения.

## 2. Определите режим открытия {#placement-options}

Одна и та же страница приложения может открываться в двух ситуациях:

- пользователь запускает приложение в Битрикс24 — на странице он выбирает лид и создает для него дело
- пользователь нажимает на созданное дело в таймлайне лида — Битрикс24 открывает ту же страницу с действиями для завершения или удаления дела

Чтобы определить ситуацию, приложение проверяет параметры, которые передал Битрикс24. При открытии дела из таймлайна Битрикс24 передает в POST-запросе `PLACEMENT_OPTIONS`. Значение содержит JSON-строку с двумя параметрами:

- `action` — действие, с которым открыта страница. Для дела приложения значение равно `view_activity`
- `activity_id` — числовой идентификатор открытого дела. Передайте его в методы [crm.activity.update](../activity-base/crm-activity-update.md) или [crm.activity.delete](../activity-base/crm-activity-delete.md)

Добавьте в начало файла `index.php` код, который получает и проверяет эти параметры:

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

```php
<?php
header('Content-Type: text/html; charset=UTF-8');

$placementOptions = [];

if (!empty($_POST['PLACEMENT_OPTIONS']))
{
    $decodedOptions = json_decode($_POST['PLACEMENT_OPTIONS'], true);

    if (is_array($decodedOptions))
    {
        $placementOptions = $decodedOptions;
    }
}

$activityId = isset($placementOptions['activity_id'])
    ? (int)$placementOptions['activity_id']
    : 0;

$isActivityView = ($placementOptions['action'] ?? '') === 'view_activity'
    && $activityId > 0;
?>
```

Если страница открыта из дела, переменная `$isActivityView` получит значение `true`, а `$activityId` — числовой идентификатор дела.

## 3. Добавьте интерфейс страницы {#interface}

Сразу после PHP-блока добавьте HTML-разметку. Она покажет нужные кнопки в зависимости от значения `$isActivityView`:

```php
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Дело приложения</title>
</head>
<body hidden>
<script src="//api.bitrix24.tech/api/v1/"></script>

<?php if ($isActivityView): ?>
    <p>Идентификатор дела: <?= $activityId ?></p>
    <button type="button" onclick="updateActivity(<?= $activityId ?>)">
        Завершить дело
    </button>
    <button type="button" onclick="deleteActivity(<?= $activityId ?>)">
        Удалить дело
    </button>
<?php else: ?>
    <button type="button" onclick="selectCRMEntity()">Выбрать лид</button>
    <span id="selected-entity">Лид не выбран</span>
    <button type="button" onclick="addActivity()">Создать дело</button>
<?php endif; ?>

<p id="status" role="status"></p>
```

Когда пользователь запускает приложение в Битрикс24, страница показывает кнопки для выбора лида и создания дела. Когда пользователь открывает созданное дело из таймлайна, страница показывает его идентификатор и действия для завершения или удаления.

## 4. Инициализируйте BX24.js {#initialize}

После HTML-разметки добавьте общие переменные и вспомогательные функции. Замените значение `responsibleId` на идентификатор сотрудника, ответственного за дело.

Библиотека [BX24.js](../../../../../sdk/bx24-js-sdk/index.md) уже подключена в предыдущем блоке. Дождитесь ее инициализации с помощью [BX24.init](../../../../../sdk/bx24-js-sdk/system-functions/bx24-init.md), прежде чем вызывать методы Битрикс24.

```html
<script>
    const responsibleId = 1;
    let selectedEntityId = null;

    BX24.init(() => {
        document.body.hidden = false;
    });

    function showStatus(message, isError = false)
    {
        const status = document.getElementById('status');
        status.textContent = message;
        status.style.color = isError ? 'red' : 'green';
    }

    function showError(result)
    {
        showStatus(
            `Ошибка: ${result.error()} — ${result.error_description()}`,
            true
        );
    }
</script>
```

После выполнения `BX24.init` страница станет видимой. Функции `showStatus` и `showError` будут выводить результат REST-вызовов.

## 5. Добавьте создание дела {#create}

Чтобы создать дело приложения, вызовите метод [crm.activity.add](../activity-base/crm-activity-add.md) с полем `PROVIDER_ID=REST_APP`. Дело с `PROVIDER_ID=REST_APP` можно создать только из установленного приложения. Изменить или удалить его может только приложение, которое его создало.
При вызове через вебхук Битрикс24 вернет ошибку `Application context required.`, а при вызове из другого приложения — `Access denied.`

Метод [crm.activity.add](../activity-base/crm-activity-add.md) помечен как устаревший, но в этом сценарии заменить его на [crm.activity.todo.add](../todo/crm-activity-todo-add.md) нельзя: метод не принимает поле `PROVIDER_ID`.

В примере пользователь выбирает лид через [BX24.selectCRM](../../../../../sdk/bx24-js-sdk/system-dialogues/bx24-select-crm.md). Для лида функция возвращает идентификатор с префиксом, например `L_123`. Приложение удаляет префикс `L_` и передает числовую часть в `OWNER_ID` метода [crm.activity.add](../activity-base/crm-activity-add.md).

Для другого объекта CRM измените `entityType`, префикс идентификатора и `OWNER_TYPE_ID`.

Основные поля для создания дела:

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

- `OWNER_TYPE_ID*` — числовой идентификатор [типа объекта CRM](../../../data-types.md#object_type). Для лида передайте `1`
- `OWNER_ID*` — числовой идентификатор выбранного лида
- `PROVIDER_ID*` — идентификатор провайдера. Для дела приложения передайте `REST_APP`
- `PROVIDER_TYPE_ID` — тип дела приложения. Если поле не передано, Битрикс24 использует значение `LINK`
- `SUBJECT*` — название дела в таймлайне
- `RESPONSIBLE_ID*` — идентификатор сотрудника, ответственного за дело

Поле `TYPE_ID` обычно обязательно для [crm.activity.add](../activity-base/crm-activity-add.md). Для `REST_APP` его можно не передавать: метод автоматически устанавливает тип дела «Провайдер».

Добавьте после предыдущего блока функции для выбора лида и создания дела:

```html
<script>
    function selectCRMEntity()
    {
        BX24.selectCRM(
            { entityType: ['lead'] },
            (selected) => {
                const lead = selected.lead && selected.lead[0];

                if (!lead)
                {
                    return;
                }

                const id = Number(lead.id.replace(/^L_/, ''));

                if (!Number.isInteger(id) || id <= 0)
                {
                    showStatus('Не удалось определить идентификатор лида', true);
                    return;
                }

                selectedEntityId = id;
                document.getElementById('selected-entity').textContent = lead.title;
                showStatus(`Выбран лид с идентификатором ${id}`);
            }
        );
    }

    function addActivity()
    {
        if (!selectedEntityId)
        {
            showStatus('Сначала выберите лид', true);
            return;
        }

        BX24.callMethod(
            'crm.activity.add',
            {
                fields: {
                    OWNER_TYPE_ID: 1,
                    OWNER_ID: selectedEntityId,
                    PROVIDER_ID: 'REST_APP',
                    PROVIDER_TYPE_ID: 'LINK',
                    SUBJECT: 'Новое дело приложения',
                    COMPLETED: 'N',
                    RESPONSIBLE_ID: responsibleId,
                    DESCRIPTION: 'Описание нового дела'
                }
            },
            (result) => {
                if (result.error())
                {
                    showError(result);
                    return;
                }

                showStatus(`Дело создано. Идентификатор: ${result.data()}`);
            }
        );
    }
</script>
```

После успешного вызова [crm.activity.add](../activity-base/crm-activity-add.md) страница покажет числовой идентификатор созданного дела.

## 6. Добавьте изменение и удаление дела {#manage}

Чтобы завершить дело, передайте его идентификатор в метод [crm.activity.update](../activity-base/crm-activity-update.md) и установите поле `COMPLETED=Y`.

Чтобы удалить дело, передайте тот же идентификатор в метод [crm.activity.delete](../activity-base/crm-activity-delete.md).

Добавьте после функций создания дела следующий блок. Он также закрывает элементы `body` и `html`, поэтому разместите его в конце файла:

```html
<script>
    function updateActivity(id)
    {
        BX24.callMethod(
            'crm.activity.update',
            {
                id,
                fields: {
                    COMPLETED: 'Y',
                    SUBJECT: 'Дело выполнено',
                    DESCRIPTION: 'Описание выполненного дела'
                }
            },
            (result) => {
                if (result.error())
                {
                    showError(result);
                    return;
                }

                showStatus('Дело изменено');
            }
        );
    }

    function deleteActivity(id)
    {
        if (!window.confirm('Удалить дело?'))
        {
            return;
        }

        BX24.callMethod(
            'crm.activity.delete',
            { id },
            (result) => {
                if (result.error())
                {
                    showError(result);
                    return;
                }

                showStatus('Дело удалено');
            }
        );
    }
</script>
</body>
</html>
```

Методы вернут `true` после успешного изменения или удаления дела. Страница выведет сообщение о выполненном действии.

## 7. Разместите и проверьте приложение {#check}

Сохраните `index.php` и разместите его на сервере, доступном из внешней сети. Полученный URL укажите как адрес основной страницы приложения, затем установите приложение в Битрикс24.

Проверьте сценарий:

1. Откройте приложение, выберите лид и создайте дело
2. Проверьте, что приложение показало числовой идентификатор нового дела
3. Откройте карточку выбранного лида и найдите дело в таймлайне
4. Нажмите на дело и проверьте, что Битрикс24 открыл приложение с тем же идентификатором
5. Завершите или удалите дело и проверьте результат в таймлайне
