package com.web.xiche.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.web.xiche.dao.AccountFlowMapper;
import com.web.xiche.dao.CustomerMapper;
import com.web.xiche.dao.ProjectMapper;
import com.web.xiche.po.AccountFlow;
import com.web.xiche.po.Customer;
import com.web.xiche.po.Project;
import com.web.xiche.service.XicheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class XicheServiceImpl implements XicheService {
	@Autowired
	ProjectMapper projectMapper;
	@Autowired
	AccountFlowMapper AccountFlowMapper;
	@Autowired
	CustomerMapper customerMapper;
	
	
	@Override
	public PageInfo<Project> findPageInfo(PageInfo<Project> pageInfo, Project project) {
		PageHelper.startPage(pageInfo.getPageNum(), pageInfo.getPageSize());
		return new PageInfo<Project>(projectMapper.findPage(project));
	}
	@Override
	public int saveOrUpdateProject(Project project) {
		int result = 0;
        Integer id = project.getId();
        project.setCreatetime(new Date());
        if (id == null){
            result = projectMapper.insertSelective(project);
        }else {
            result = projectMapper.updateByPrimaryKeySelective(project);
        }
        return  result;
	}
	@Override
	public Project findProjectById(int id) {
		return projectMapper.selectByPrimaryKey(id);
	}
	@Override
	public List<Project> findAll() {
		return projectMapper.findAll();
	}

    @Override
    public PageInfo<Customer> findPageCus(PageInfo<Customer> pageInfo, Customer customer) {
        PageHelper.startPage(pageInfo.getPageNum(), pageInfo.getPageSize());
        return new PageInfo<Customer>(customerMapper.findPage(customer));
    }

    @Override
	public PageInfo<AccountFlow> findAccountFlowPageInfo(PageInfo<AccountFlow> pageInfo, AccountFlow accountFlow) {
		PageHelper.startPage(pageInfo.getPageNum(), pageInfo.getPageSize());
		return new PageInfo<AccountFlow>(AccountFlowMapper.findPage(accountFlow));
	}
	@Override
	public int saveOrUpdateAccountFlow(AccountFlow accountFlow) {
		int result = 0;
		Integer id = accountFlow.getId();
        accountFlow.setCreatetime(new Date());
        if (id == null){
            result = AccountFlowMapper.insertSelective(accountFlow);
        }else {
            result = AccountFlowMapper.updateByPrimaryKeySelective(accountFlow);
        }
        return  result;
	}
	@Override
	public AccountFlow findAccountFlowById(int id) {
		// TODO Auto-generated method stub
		return AccountFlowMapper.selectByPrimaryKey(id);
	}

    @Override
    public Customer findCustomerById(int id) {
        return customerMapper.selectByPrimaryKey(id);
    }

    @Override
    public int saveOrUpdateCustomer(Customer customer) {
        int result = 0;
        Integer id = customer.getId();
        customer.setCreatetime(new Date());
        if (id == null){
            result = customerMapper.insertSelective(customer);
        }else {
            result = customerMapper.updateByPrimaryKeySelective(customer);
        }
        return  result;
    }

}
