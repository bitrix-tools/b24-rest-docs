# REST-методы для модуля Учёт рабочего времени

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`timeman`](../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

## Список методов

#|
|| **Метод** | **Описание** | **С версии** ||
|| **Базовые методы** | | ||
|| [timeman.settings](./base/timeman-settings.md) | Получение настроек рабочего времени пользователя | 17.0.2 ||
|| [timeman.status](./base/timeman-status.md) | Получение информации о текущем рабочем дне пользователя | 17.0.2 ||
|| [timeman.open](./base/timeman-open.md) | Начать новый рабочий день либо возобновить закрытый или приостановленный | 17.0.2 ||
|| [timeman.close](./base/timeman-close.md) | Закрыть рабочий день | 17.0.2 ||
|| [timeman.pause](./base/timeman-pause.md) | Приостановить рабочий день | 17.0.2 ||
|| **Офисные сети** | | ||
|| [timeman.networkrange.check](./networkrange/timeman-networkrange-check.md) | Метод для проверки IP-адреса на вхождение в диапазоны сетевых адресов офисной сети. | 18.5.0 ||
|| [timeman.networkrange.get](./networkrange/timeman-networkrange-get.md) | Метод для получения диапазонов сетевых адресов, входящих в офисную сеть. | 18.5.0 ||
|| [timeman.networkrange.set](./networkrange/timeman-networkrange-set.md) | Метод для установки диапазонов сетевых адресов, входящих в офисную сеть. | 18.5.0 ||
|| **Контроль времени** | | ||
|| [timeman.timecontrol.report.add](./timecontrol/timeman-timecontrol-report-add.md) | Метод для отправки отчета о выявленном отсутствии. | 18.5.0 ||
|| [timeman.timecontrol.reports.get](./timecontrol/timeman-timecontrol-reports-get.md) | Метод для получения отчета о выявленных отсутствиях. | 18.5.0 ||
|| [timeman.timecontrol.reports.settings.get](./timecontrol/timeman-timecontrol-reports-settings-get.md) | Метод для получения пользовательских настроек для построения интерфейса отчетов инструмента контроля времени. | 18.5.0 ||
|| [timeman.timecontrol.reports.users.get](./timecontrol/timeman-timecontrol-reports-users-get.md) | Метод для получения списка пользователей, относящихся к указанному подразделению. | 18.5.0 ||
|| [timeman.timecontrol.settings.get](./timecontrol/timeman-timecontrol-settings-get.md) | Метод для получения настроек инструмента контроля времени. | 18.5.0 ||
|| [timeman.timecontrol.settings.set](./timecontrol/timeman-timecontrol-settings-set.md) | Метод для установки настроек инструмента контроля времени. | 18.5.0 ||
|| **Рабочий график** | | ||
|| [timeman.schedule.get](./schedule/timeman-schedule-get.md) | Метод позволяет получить рабочий график по его идентификатору. | ||
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

Работа с рабочим днём сотрудника

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