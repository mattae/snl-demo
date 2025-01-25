/*
 * MIT License
 *
 * Copyright (c) 2025 [AUTHOR OR ORGANIZATION]
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package org.lamisplus.react.services;

import org.lamisplus.plugins.dashboard.extensions.Chart;
import org.lamisplus.plugins.dashboard.extensions.DashboardProviderExtension;
import org.pf4j.Extension;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Extension
public class ChartService implements DashboardProviderExtension {

    @Override
    public String getSection() {
        return "Charts from React";
    }

    @Override
    public List<Chart> getCharts() {
        List<Chart> charts = new ArrayList<>();
        var chart = new Chart("Bar Chart", UUID.fromString("01949a46-e706-70ef-a04f-5ac4239b3f4c"));
        charts.add(chart);
        return charts;
    }
}
