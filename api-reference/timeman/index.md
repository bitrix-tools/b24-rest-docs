# Учет рабочего времени: обзор методов

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}


## Обзор методов 

> Scope: [`timeman`](../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Рабочий день {#all-methods}

#|
|| **Метод** | **Описание** ||
|| [timeman.open](./timeman-open.md) | Начать новый рабочий день или возобновить закрытый ||
|| [timeman.pause](./timeman-pause.md) | Поставить паузу в рабочем дне ||
|| [timeman.close](./timeman-close.md) | Закрыть рабочий день ||
|| [timeman.status](./timeman-status.md) | Получить информацию о текущем рабочем дне пользователя ||
|| [timeman.settings](./timeman-settings.md) | Получить настройки рабочего времени пользователя ||
|#

### Офисные сети

#|
|| **Метод** | **Описание** ||
|| [timeman.networkrange.get](./timeman-networkrange-get.md) | Получает диапазоны сетевых адресов, входящие в офисную сеть ||
|| [timeman.networkrange.set](./timeman-networkrange-set.md) | Устанавливает диапазоны сетевых адресов, входящие в офисную сеть ||
|| [timeman.networkrange.check](./timeman-networkrange-check.md) | Проверяет входит ли IP-адрес в диапазоны сетевых адресов офисной сети ||
|#

### Контроль времени

#|
|| **Метод** | **Описание** ||
|| [timeman.timecontrol.report.add](./timeman-timecontrol-report-add.md) | Отправляет отчет о выявленном отсутствии ||
|| [timeman.timecontrol.reports.get](./timeman-timecontrol-reports-get.md) | Получает отчет о выявленных отсутствиях ||
|| [timeman.timecontrol.settings.get](./timeman-timecontrol-settings-get.md) | Получает настройки инструмента контроля времени ||
|| [timeman.timecontrol.settings.set](./timeman-timecontrol-settings-set.md) | Устанавливает настройки инструмента контроля времени ||
|| [timeman.timecontrol.reports.settings.get](./timeman-timecontrol-reports-settings-get.md) | Получает пользовательские настройки для построения интерфейса отчетов инструмента контроля времени ||
|| [timeman.timecontrol.reports.users.get](./timeman-timecontrol-reports-users-get.md) | Получает список пользователей указанного подразделения ||
|#

### Рабочий график

#|
|| **Метод** | **Описание** ||
|| [timeman.schedule.get](./timeman-schedule-get.md) | Получает рабочий график по идентификатору ||
|#


## Несколько примеров

Примеры работы на старом ядре.

Подтверждение рабочего отчета с положительной оценкой на странице `/timeman/work_report.php`:

```php
CModule::IncludeModule('timeman');

$ID = 8;
$arFields = array(
    "MARK" => "G", // "G" - положительно, "B" - отрицательно, "N" - нет оценки, "X" - без подтверждения
);

if ($arFields["MARK"] != "X")
{
    $arFields["APPROVER"] = $USER->GetID();
    $arFields["APPROVE"] = "Y";
    $arFields["APPROVE_DATE"] = ConvertTimeStamp(time(), "FULL");
}
else
{
    $arFields["APPROVE"] = "N";
    $arFields["APPROVER"] = 0;
    $arFields["APPROVE_DATE"] = "";
}

$result = CTimeManReportFull::Update($ID, $arFields);
var_dump($result);
```

Работа с рабочим днем сотрудника

```php
CModule::IncludeModule('timeman');
$USER_ID = 1;
$report = "";
$obUser = new CTimeManUser($USER_ID);

$obUser->OpenDay($timestamp, $report); // открыть рабочий день
$obUser->CloseDay($timestamp, $report); // закрыть рабочий день
$state = $oTimeManUser->State(); // узнать статус рабочего дня сотрудника $USER_ID
$arInfo = $oTimeManUser->GetCurrentInfo(); // информация о рабочем дне сотрудника $USER_ID

// Данные об активной задаче
CModule::IncludeModule('tasks');
$oTaskTimer = CTaskTimerManager::getInstance($USER_ID);
$rs = $oTaskTimer->getLastTimer();
```