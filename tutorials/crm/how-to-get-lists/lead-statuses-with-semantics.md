# Как получить список статусов лидов с семантикой

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Пример получения всех статусов лида с семантикой.

{% list tabs %}

- JS

    ```js
    BX24.callMethod('crm.status.list', { filter: { ENTITY_ID: 'STATUS' } }, function(resultLeads) {
        if (resultLeads.error()) {
            console.error(resultLeads.error());
        } else {
            if (resultLeads.data().length > 0) {
                var table = document.createElement('table');

                var thead = document.createElement('thead');
                var trHead = document.createElement('tr');
                ['STATUS ID', 'NAME', 'SEMANTICS'].forEach(function(text) {
                    var th = document.createElement('th');
                    th.textContent = text;
                    trHead.appendChild(th);
                });
                thead.appendChild(trHead);
                table.appendChild(thead);

                var tbody = document.createElement('tbody');
                resultLeads.data().forEach(function(item) {
                    var tr = document.createElement('tr');
                    if (item.EXTRA && item.EXTRA.COLOR) {
                        tr.style.color = item.EXTRA.COLOR;
                    }
                    ['STATUS_ID', 'NAME', 'EXTRA.SEMANTICS'].forEach(function(key) {
                        var td = document.createElement('td');
                        td.textContent = key.split('.').reduce(function(acc, k) {
                            return acc && acc[k];
                        }, item);
                        tr.appendChild(td);
                    });
                    tbody.appendChild(tr);
                });
                table.appendChild(tbody);

                document.body.appendChild(table);
            }
        }
    });
    ```

- PHP

    {% note info %}

    Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../first-steps/how-to-use-examples.md)

    {% endnote %}

    ```php
    <?
    $resultLeads = CRest::call('crm.status.list', ['filter' => ['ENTITY_ID' => 'STATUS']]);
    if (!empty($resultLeads['result'])):
    ?>
        <table>
            <thead>
            <tr>
                <th>STATUS ID</th>
                <th>NAME</th>
                <th>SEMANTICS</th>
            </tr>
            </thead>
            <tbody>
            <? foreach ($resultLeads['result'] as $item): ?>
            <tr <?=(!empty($item['EXTRA']['COLOR']) ? ' style="color:' . $item['EXTRA']['COLOR'] . '"' : '');?>>
                <td><?=$item['STATUS_ID']?></td>
                <td><?=$item['NAME']?></td>
                <td><?=$item['EXTRA']['SEMANTICS']?></td>
            <tr>
                <? endforeach; ?>
            </tbody>
        </table>
    <? endif; ?>
    ```

{% endlist %}
