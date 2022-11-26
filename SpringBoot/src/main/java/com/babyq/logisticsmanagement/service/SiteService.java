package com.babyq.logisticsmanagement.service;

import com.babyq.logisticsmanagement.entity.Order;
import com.babyq.logisticsmanagement.entity.Site;
import com.babyq.logisticsmanagement.mapper.OrderMapper;
import com.babyq.logisticsmanagement.mapper.SiteMapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class SiteService extends ServiceImpl <SiteMapper, Site>{

}
